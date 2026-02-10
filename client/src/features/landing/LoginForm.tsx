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

	// Login form state
	const [loginData, setLoginData] = useState({
		login: '',
		password: '',
	})

	// Register form state
	const [registerData, setRegisterData] = useState({
		login: '',
		password: '',
		email: '',
		username: '',
	})

	const handleTabChange = (_event: React.SyntheticEvent, newValue: TabType) => {
		setActiveTab(newValue)
		setError('')
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const user = await authAPI.login(loginData)
			onLoginSuccess(user)
		} catch (err: any) {
			const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.'
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
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
						onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
					/>
					<TextField
						label='Login'
						variant='outlined'
						fullWidth
						required
						value={registerData.login}
						onChange={e => setRegisterData({ ...registerData, login: e.target.value })}
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
						variant='outlined'
						fullWidth
						required
						value={registerData.password}
						onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
					/>
					<Button
						type='submit'
						variant='contained'
						size='large'
						fullWidth
						disabled={loading}
						sx={{ mt: 2 }}>
						{loading ? 'Registering...' : 'Register'}
					</Button>
				</Box>
			)}
		</Paper>
	)
}
