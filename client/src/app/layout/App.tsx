import { List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
	const [dietdays, setDietDays] = useState<DietDay[]>([])

	useEffect(() => {
		axios
			.get<DietDay[]>('https://localhost:5002/api/dietdays')
			.then(response => setDietDays(response.data))
			.catch(error => console.error('Error fetching diet days:', error))
	}, [])

	return (
		<>
			<Typography variant='h3'>Health App</Typography>
			<List>
				{dietdays.map(dietday => (
					<ListItem key={dietday.id}>
						<ListItemText>{dietday.breakfast}</ListItemText>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default App
