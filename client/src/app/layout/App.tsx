import { Box, Container, CssBaseline } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import DietDaysDashboard from '../../features/dietDays/dashboard/DietDayDashboard'

function App() {
	const [dietDays, setDietDays] = useState<DietDay[]>([])

	useEffect(() => {
		axios
			.get<DietDay[]>('https://localhost:5002/api/dietdays')
			.then(response => setDietDays(response.data))
			.catch(error => console.error('Error fetching diet days:', error))
	}, [])

	return (
		<Box sx={{ bgcolor: '#eeeeee' }}>
			<CssBaseline />
			<NavBar />
			<Container
				maxWidth='xl'
				sx={{ mt: 3 }}>
				<DietDaysDashboard dietDays={dietDays} />
			</Container>
		</Box>
	)
}

export default App
