import { List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
	const [activities, setActivities] = useState<Activity[]>([])

	useEffect(() => {
		axios
			.get<Activity[]>('https://localhost:5002/api/activities')
			.then(response => setActivities(response.data))
			.catch(error => console.error('Error fetching activities:', error))
	}, [])

	return (
		<>
			<Typography variant='h3'>Health App</Typography>
			<List>
				{activities.map(activity => (
					<ListItem key={activity.id}>
						<ListItemText>{activity.title}</ListItemText>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default App
