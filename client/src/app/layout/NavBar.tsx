import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, MenuItem, Container } from '@mui/material'

export default function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				sx={{ backgroundColor: '#1f6f5c' }}>
				<Container maxWidth='xl'>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
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
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Diets</MenuItem>
							<MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Exercise</MenuItem>
						</Box>{' '}
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}
