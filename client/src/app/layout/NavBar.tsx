import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, MenuItem, Container } from '@mui/material'

type Props = {
	isAuthenticated: boolean
	activeTab: 'diets' | 'exercise'
	onTabChange: (tab: 'diets' | 'exercise') => void
	onLogin: () => void
	onLogout: () => void
}

export default function NavBar({ isAuthenticated, activeTab, onTabChange, onLogin, onLogout }: Props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				sx={{ backgroundColor: 'primary.main' }}>
				<Container maxWidth='xl'>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', gap: 1 }}>
						<Box>
							<MenuItem sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, p: 0 }}>
								<Group sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
								<Typography
									variant='h6'
									sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' } }}
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
}
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
}
}}>
Exercise
</MenuItem>
							</Box>
						)}
						<Box sx={{ ml: 'auto' }}>
							<MenuItem
								onClick={isAuthenticated ? onLogout : onLogin}
								sx={{
									fontSize: '1rem',
									fontWeight: 'bold',
									textTransform: 'uppercase',
									color: 'white',
									border: '2px solid white',
									borderRadius: 3,
									px: 1.5,
									py: 0.25,
									'&:hover': { backgroundColor: 'white', color: 'primary.main' },
								}}>
								{isAuthenticated ? 'Logout' : 'Login'}
							</MenuItem>
						</Box>{' '}
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}
