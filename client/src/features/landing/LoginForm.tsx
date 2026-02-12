import { useState } from 'react'
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, Alert } from '@mui/material'
import { authAPI } from '../../lib/api'

type Props = {
	onLoginSuccess: (user: User) => void
	initialTab?: 'login' | 'register'
}

type TabType = 'login' | 'register'

export default function LoginForm({ onLoginSuccess, initialTab = 'login' }: Props) {
	const [activeTab, setActiveTab] = useState<TabType>(initialTab)
	const [error, setError] = useState<string>('')
	const [loading, setLoading] = useState(false)
	const [passwordError, setPasswordError] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>('')
	const [loginError, setLoginError] = useState<string>('')

	const [loginData, setLoginData] = useState({
		login: '',
		password: '',
	})

	const [registerData, setRegisterData] = useState({
		login: '',
		password: '',
		email: '',
		username: '',
	})

	const handleTabChange = (_event: React.SyntheticEvent, newValue: TabType) => {
		setActiveTab(newValue)
		setError('')
		setPasswordError('')
		setUsernameError('')
		setLoginError('')
	}

	const validatePassword = (password: string): boolean => {
		if (password.length < 6) {
			setPasswordError('Password must be at least 6 characters')
			return false
		}
		setPasswordError('')
		return true
	}

	const validateUsername = (username: string): boolean => {
		if (username.length < 3) {
			setUsernameError('Username must be at least 3 characters')
			return false
		}
		setUsernameError('')
		return true
	}

	const validateLogin = (login: string): boolean => {
		if (login.length < 3) {
			setLoginError('Login must be at least 3 characters')
			return false
		}
		setLoginError('')
		return true
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const user = await authAPI.login(loginData)
			onLoginSuccess(user)
		} catch (err: any) {
			if (!validatePassword(registerData.password)) {
				return
			}

			const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.'
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!validateUsername(registerData.username) || !validateLogin(registerData.login) || !validatePassword(registerData.password)) {
			return
		}

		setLoading(true)

		try {
			const user = await authAPI.register(registerData)
			onLoginSuccess(user)
		} catch (err: any) {
			const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.'
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Paper
			elevation={3}
			sx={{ maxWidth: 450, mx: 'auto', mt: 4, p: 4 }}>
			<Typography
				variant='h5'
				component='h2'
				textAlign='center'
				gutterBottom
				sx={{ mb: 3, fontWeight: 600 }}>
				Welcome to Long Life Guardian
			</Typography>

			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				centered
				sx={{ mb: 3 }}>
				<Tab
					label='Login'
					value='login'
				/>
				<Tab
					label='Register'
					value='register'
				/>
			</Tabs>

			{error && (
				<Alert
					severity='error'
					sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			{activeTab === 'login' ? (
				<Box
					component='form'
					onSubmit={handleLogin}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<TextField
						label='Login'
						variant='outlined'
						fullWidth
						required
						value={loginData.login}
						onChange={e => setLoginData({ ...loginData, login: e.target.value })}
					/>
					<TextField
						label='Password'
						type='password'
						variant='outlined'
						fullWidth
						required
						value={loginData.password}
						onChange={e => setLoginData({ ...loginData, password: e.target.value })}
					/>
					<Button
						type='submit'
						variant='contained'
						size='large'
						fullWidth
						disabled={loading}
						sx={{ mt: 2 }}>
						{loading ? 'Logging in...' : 'Login'}
					</Button>
				</Box>
			) : (
				<Box
					component='form'
					onSubmit={handleRegister}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<TextField
						label='Username'
						variant='outlined'
						fullWidth
						required
						value={registerData.username}
						onChange={e => {
							setRegisterData({ ...registerData, username: e.target.value })
							if (usernameError) {
								validateUsername(e.target.value)
							}
						}}
						onBlur={e => validateUsername(e.target.value)}
						error={!!usernameError}
						helperText={usernameError || 'Minimum 3 characters'}
					/>
					<TextField
						label='Login'
						variant='outlined'
						fullWidth
						required
						value={registerData.login}
						onChange={e => {
							setRegisterData({ ...registerData, login: e.target.value })
							if (loginError) {
								validateLogin(e.target.value)
							}
						}}
						onBlur={e => validateLogin(e.target.value)}
						error={!!loginError}
						helperText={loginError || 'Minimum 3 characters'}
					/>
					<TextField
						label='Email'
						type='email'
						variant='outlined'
						fullWidth
						required
						value={registerData.email}
						onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
					/>
					<TextField
						label='Password'
						type='password'
						onChange={e => {
							setRegisterData({ ...registerData, password: e.target.value })
							if (passwordError) {
								validatePassword(e.target.value)
							}
						}}
						onBlur={e => validatePassword(e.target.value)}
						error={!!passwordError}
						helperText={passwordError || 'Minimum 6 characters'}
					/>
					<Button
						type='submit'
						variant='contained'
						size='large'
						fullWidth
						disabled={loading || !!passwordError || !!usernameError || !!loginError}
						sx={{ mt: 2 }}>
						{loading ? 'Registering...' : 'Register'}
					</Button>
				</Box>
			)}
		</Paper>
	)
}
