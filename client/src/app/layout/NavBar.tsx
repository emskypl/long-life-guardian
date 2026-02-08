import { Shield } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, MenuItem, Container } from '@mui/material'

type Props = {
	isAuthenticated: boolean
	activeTab: 'diets' | 'exercise'
	onTabChange: (tab: 'diets' | 'exercise') => void
	onLogin: () => void
	onLogout: () => void
	onGoHome: () => void
	showLoginForm?: boolean
}

export default function NavBar({ isAuthenticated, activeTab, onTabChange, onLogin, onLogout, onGoHome, showLoginForm }: Props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				sx={{ backgroundColor: 'primary.main' }}>
				<Container maxWidth='xl'>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', gap: 1 }}>
						<Box
							onClick={onGoHome}
							sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
							<MenuItem sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, p: 0 }}>
								<Shield sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />
								<Typography
									variant='h6'
									sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' }, color: 'white' }}
									fontWeight='bold'>
									Long Life Guardian
								</Typography>
							</MenuItem>
						</Box>
						{isAuthenticated && (
							<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, ml: 4, justifyContent: 'center', width: '100%' }}>
								<MenuItem
									onClick={() => onTabChange('diets')}
									sx={{
										fontSize: '1.2rem',
										textTransform: 'uppercase',
										fontWeight: 'bold',
										color: activeTab === 'diets' ? 'white' : 'rgba(255, 255, 255, 0.7)',
										borderBottom: activeTab === 'diets' ? '3px solid white' : 'none',
										pb: 1,
										'&:hover': {
											color: 'white',
											bgcolor: 'rgba(255, 255, 255, 0.1)',
										},
									}}>
									Diets
								</MenuItem>
								<MenuItem
									onClick={() => onTabChange('exercise')}
									sx={{
										fontSize: '1.2rem',
										textTransform: 'uppercase',
										fontWeight: 'bold',
										color: activeTab === 'exercise' ? 'white' : 'rgba(255, 255, 255, 0.7)',
										borderBottom: activeTab === 'exercise' ? '3px solid white' : 'none',
										pb: 1,
										'&:hover': {
											color: 'white',
											bgcolor: 'rgba(255, 255, 255, 0.1)',
										},
									}}>
									Exercise
								</MenuItem>
							</Box>
						)}
						<Box sx={{ ml: 'auto', display: { xs: 'block', md: 'flex' }, gap: 1 }}>
							<MenuItem
								onClick={isAuthenticated ? onLogout : onLogin}
								sx={{
									display: showLoginForm ? 'none' : 'block',
									fontSize: '1rem',
									fontWeight: 'bold',
									backgroundColor: 'white',
									color: 'primary.main',
									borderRadius: 3,
									px: 'auto',
									py: 'auto',
									'&:hover': { backgroundColor: 'white', color: 'primary.main' },
								}}>
								{isAuthenticated ? 'Sign Out' : 'Sign In'}
							</MenuItem>
						</Box>{' '}
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}
