import { Alert, Box, Container, CssBaseline, Snackbar } from '@mui/material'

import { useEffect, useState } from 'react'
import { dietDayAPI } from '../../lib/api'
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

	const backgroundImage = '/images/background_2400_1320.jpg'

	// Check for existing user in localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser)
				setUser(parsedUser)
			} catch (error) {
				console.error('Error parsing stored user:', error)
				localStorage.removeItem('user')
			}
		}
	}, [])

	useEffect(() => {
		if (user) {
			dietDayAPI
				.getByUserId(user.userId)
				.then(data => setDietDays(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
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
		localStorage.setItem('user', JSON.stringify(userData))
		showSnackbar(`Welcome, ${userData.username}!`, 'success')
		setShowLoginForm({ show: false, activeTab: 'login' })
	}

	const handleLogout = () => {
		setUser(null)
		setEditMode(false)
		setActiveTab('diets')
		setDietDays([])
		setShowLoginForm({ show: false, activeTab: 'login' })
		localStorage.removeItem('user')
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
			setShowLoginForm({ show: false, activeTab: 'login' })
		} else {
			handleTabChange('diets')
		}
	}

	const ensureValidDietDay = (dietDay: DietDay, isUpdate: boolean): Partial<DietDay> => {
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
			userId: user?.userId || '',
		}

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
			dietDayAPI
				.update(validDietDay as DietDay)
				.then(() => {
					return dietDayAPI.getById(dietDay.id)
				})
				.then(updatedDietDay => {
					setDietDays(dietDays.map(existingDietDay => (existingDietDay.id === dietDay.id ? updatedDietDay : existingDietDay)))
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
			dietDayAPI
				.create(validDietDay)
				.then(newId => {
					return dietDayAPI.getById(newId)
				})
				.then(newDietDay => {
					const newDietDays = [...dietDays, newDietDay].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
					setDietDays(newDietDays)
					setEditMode(false)
					showSnackbar('Diet day created successfully!', 'success')
					console.log('Diet day created successfully with ID:', newDietDay.id)
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
		<Box sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100dvh' }}>
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
