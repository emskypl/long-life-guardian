import { Box, Container, CssBaseline } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import DietDaysDashboard from '../../features/dietDays/dashboard/DietDayDashboard'

function App() {
	const [dietDays, setDietDays] = useState<DietDay[]>([])
	const [selectedDietDay, setSelectedDietDay] = useState<DietDay | undefined>(undefined)
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		axios
			.get<DietDay[]>('https://localhost:5002/api/dietdays')
			.then(response => setDietDays(response.data))
			.catch(error => console.error('Error fetching diet days:', error))
	}, [])

	const handleSelectDietDay = (id: string) => {
		setSelectedDietDay(dietDays.find(x => x.id === id))
	}

	const handleCancelSelectDietDay = () => {
		setSelectedDietDay(undefined)
	}

	const handleOpenForm = (id?: string) => {
		if (id) handleSelectDietDay(id)
		else handleCancelSelectDietDay()
		setEditMode(true)
	}

	const handleFormClose = () => {
		setEditMode(false)
	}

	const handleSubmitForm = (dietDay: DietDay) => {
		if (dietDay.id) {
			setDietDays(dietDays.map(x => (x.id == dietDay.id ? dietDay : x)))
		} else {
			const newDietDay = { ...dietDay, id: dietDays.length.toString() }
			setSelectedDietDay(newDietDay)
			setDietDays([...dietDays, newDietDay])
		}
		setEditMode(false)
	}

	const handleDelete = (id: string) => {
		setDietDays(dietDays.filter(x => x.id !== id))
	}

	return (
		<Box sx={{ bgcolor: '#eeeeee', minHeight: '100dvh' }}>
			<CssBaseline />
			<NavBar openForm={handleOpenForm} />
			<Container
				maxWidth='xl'
				sx={{ mt: 3, mb: 3, minHeight: '80dvh' }}>
				<DietDaysDashboard
					dietDays={dietDays}
					cancelSelectedDietDay={handleCancelSelectDietDay}
					selectDietDay={handleSelectDietDay}
					selectedDietDay={selectedDietDay}
					editMode={editMode}
					openForm={handleOpenForm}
					closeForm={handleFormClose}
					submitForm={handleSubmitForm}
					deleteDietDay={handleDelete}
				/>
			</Container>
		</Box>
	)
}

export default App
