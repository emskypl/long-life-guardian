import { Typography, Container, Paper } from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction'

export default function ExerciseDashboard() {
	return (
		<Container maxWidth='md'>
			<Paper
				elevation={3}
				sx={{
					mt: 8,
					p: 6,
					textAlign: 'center',
					bgcolor: 'background.paper',
					borderRadius: 3,
				}}>
				<ConstructionIcon sx={{ fontSize: 80, color: 'warning.main', mb: 3 }} />
				<Typography
					variant='h3'
					gutterBottom
					sx={{ fontWeight: 600, color: 'text.primary' }}>
					Under Construction
				</Typography>
				<Typography
					variant='h6'
					color='text.secondary'
					sx={{ mt: 2 }}>
					The Exercise feature is coming soon. Stay tuned!
				</Typography>
			</Paper>
		</Container>
	)
}
