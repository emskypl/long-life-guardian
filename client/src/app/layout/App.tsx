import { Alert, Box, Container, CssBaseline, Snackbar } from '@mui/material'

import axios from 'axios'
import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import DietDaysDashboard from '../../features/dietDays/dashboard/DietDayDashboard'
import ExerciseDashboard from '../../features/exercise/ExerciseDashboard'
import LandingPage from '../../features/landing/LandingPage'

function App() {
	const [dietDays, setDietDays] = useState<DietDay[]>([])
	const [editMode, setEditMode] = useState(false)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(7)
	const [user, setUser] = useState<User | null>(null)
	const [activeTab, setActiveTab] = useState<'diets' | 'exercise'>('diets')
	const [showLoginForm, setShowLoginForm] = useState<{ show: boolean; activeTab: 'login' | 'register' }>({
		show: false,
		activeTab: 'login',
	})
	const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
		open: false,
		message: '',
		severity: 'success',
	})

	// Check for existing user in localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser)
				setUser(parsedUser)
				// Set axios default authorization header
				axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`
			} catch (error) {
				console.error('Error parsing stored user:', error)
				localStorage.removeItem('user')
			}
		}
	}, [])

	// Fetch diet days when user is authenticated
	useEffect(() => {
		if (user) {
			axios
				.get<DietDay[]>(`https://localhost:5002/api/dietdays/user/${user.userId}`)
				.then(response => setDietDays(response.data))
				.catch(error => {
					console.error('Error fetching diet days:', error)
					setSnackbar({ open: true, message: 'Failed to fetch diet days', severity: 'error' })
				})
		}
	}, [user])

	const handleOpenForm = () => {
		setEditMode(true)
	}

	const handleFormClose = () => {
		setEditMode(false)
	}

	const showSnackbar = (message: string, severity: 'success' | 'error') => {
		setSnackbar({ open: true, message, severity })
	}

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false })
	}

	const handleLoginSuccess = (userData: User) => {
		setUser(userData)
		// Store user in localStorage for persistence
		localStorage.setItem('user', JSON.stringify(userData))
		// Set axios default authorization header
		axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
		showSnackbar(`Welcome, ${userData.username}!`, 'success')
		// Reset login form state
		setShowLoginForm({ show: false, activeTab: 'login' })
	}

	const handleLogout = () => {
		setUser(null)
		setEditMode(false)
		setActiveTab('diets')
		setDietDays([])
		setShowLoginForm({ show: false, activeTab: 'login' })
		// Clear user from localStorage
		localStorage.removeItem('user')
		// Remove authorization header
		delete axios.defaults.headers.common['Authorization']
		showSnackbar('Logged out successfully', 'success')
	}

	const handleTabChange = (tab: 'diets' | 'exercise') => {
		setActiveTab(tab)
		setEditMode(false)
	}

	const handleShowLoginForm = (activeTab: 'login' | 'register' = 'login') => {
		setShowLoginForm({ show: true, activeTab })
	}

	const handleGoHome = () => {
		if (!user) {
			// If not logged in, go back to landing page (hide login form)
			setShowLoginForm({ show: false, activeTab: 'login' })
		} else {
			// If logged in, go to diets tab
			handleTabChange('diets')
		}
	}

	const ensureValidDietDay = (dietDay: DietDay, isUpdate: boolean): Partial<DietDay> => {
		// Ensure all meals have proper structure with name and products array
		const ensureValidMeal = (meal: Meal | undefined, defaultName: string): Partial<Meal> => {
			if (!meal) {
				return {
					name: defaultName,
					products: [],
				}
			}

			if (isUpdate && meal.id) {
				return {
					id: meal.id,
					name: meal.name || defaultName,
					products: meal.products || [],
				}
			}

			return {
				name: meal.name || defaultName,
				products: meal.products || [],
			}
		}

		const result: Partial<DietDay> = {
			date: dietDay.date || new Date().toISOString(),
			breakfast: ensureValidMeal(dietDay.breakfast, 'Breakfast') as Meal,
			lunch: ensureValidMeal(dietDay.lunch, 'Lunch') as Meal,
			dinner: ensureValidMeal(dietDay.dinner, 'Dinner') as Meal,
			snacks: ensureValidMeal(dietDay.snacks, 'Snacks') as Meal,
			caloriesTarget: typeof dietDay.caloriesTarget === 'number' ? dietDay.caloriesTarget : 0,
			proteinTarget: typeof dietDay.proteinTarget === 'number' ? dietDay.proteinTarget : 0,
			carbsTarget: typeof dietDay.carbsTarget === 'number' ? dietDay.carbsTarget : 0,
			fatTarget: typeof dietDay.fatTarget === 'number' ? dietDay.fatTarget : 0,
		}

		// Only include ID when updating
		if (isUpdate && dietDay.id) {
			result.id = dietDay.id
		}

		return result
	}

	const handleSubmitForm = (dietDay: DietDay) => {
		const isUpdate = !!dietDay.id
		const validDietDay = ensureValidDietDay(dietDay, isUpdate)

		console.log('Sending diet day to API:', JSON.stringify(validDietDay, null, 2))

		if (isUpdate) {
			// Update existing diet day
			axios
				.put('https://localhost:5002/api/dietdays', validDietDay)
				.then(() => {
					// Re-fetch the updated diet day to ensure we have complete data with IDs
					return axios.get<DietDay>(`https://localhost:5002/api/dietdays/${dietDay.id}`)
				})
				.then(response => {
					setDietDays(dietDays.map(existingDietDay => (existingDietDay.id === dietDay.id ? response.data : existingDietDay)))
					setEditMode(false)
					showSnackbar('Diet day updated successfully!', 'success')
					console.log('Diet day updated successfully')
				})
				.catch(error => {
					showSnackbar('Failed to update diet day', 'error')
					console.error('Error updating diet day:', error)
					console.error('Error response:', error.response?.data)
				})
		} else {
			// Create new diet day - don't send ID, backend will generate it
			axios
				.post('https://localhost:5002/api/dietdays', validDietDay)
				.then(response => {
					const newId = response.data
					// Fetch the newly created diet day to get complete data with all IDs
					return axios.get<DietDay>(`https://localhost:5002/api/dietdays/${newId}`)
				})
				.then(response => {
					const newDietDays = [...dietDays, response.data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
					setDietDays(newDietDays)
					setEditMode(false)
					showSnackbar('Diet day created successfully!', 'success')
					console.log('Diet day created successfully with ID:', response.data.id)
				})
				.catch(error => {
					showSnackbar('Failed to create diet day', 'error')
					console.error('Error creating diet day:', error)
					console.error('Error response:', error.response?.data)
				})
		}
	}

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<Box sx={{ bgcolor: '#eeeeee', minHeight: '100dvh' }}>
			<CssBaseline />
			<NavBar
				isAuthenticated={!!user}
				activeTab={activeTab}
				onTabChange={handleTabChange}
				onLogin={handleShowLoginForm}
				onLogout={handleLogout}
				onGoHome={handleGoHome}
				showLoginForm={showLoginForm.show}
			/>
			<Container
				maxWidth='xl'
				sx={{ mt: 3, mb: 3, minHeight: '80dvh' }}>
				{!user ? (
					<LandingPage
						onLoginSuccess={handleLoginSuccess}
						showLoginFormProp={showLoginForm.show}
						initialTabFromParent={showLoginForm.activeTab}
						setShowLoginForm={setShowLoginForm}
					/>
				) : activeTab === 'diets' ? (
					<DietDaysDashboard
						dietDays={dietDays}
						editMode={editMode}
						openForm={handleOpenForm}
						closeForm={handleFormClose}
						submitForm={handleSubmitForm}
						page={page}
						rowsPerPage={rowsPerPage}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				) : (
					<ExerciseDashboard />
				)}
			</Container>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				sx={{ zIndex: 9999 }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					variant='filled'
					sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default App
