import { Alert, Box, Container, CssBaseline, Snackbar } from '@mui/material'

import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import DietDaysDashboard from '../../features/dietDays/dashboard/DietDayDashboard'
import ExerciseDashboard from '../../features/exercise/ExerciseDashboard'
import LandingPage from '../../features/landing/LandingPage'
import { useAuth } from '../../hooks/useAuth'
import { useDietDays } from '../../hooks/useDietDays'

function App() {
	const [editMode, setEditMode] = useState(false)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(7)
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

	const { user, logout } = useAuth()
	const { dietDays, createDietDay, updateDietDay, error: dietDaysError } = useDietDays(!!user)

	// Show error notifications when dietDaysError changes
	useEffect(() => {
		if (dietDaysError) {
			showSnackbar(dietDaysError, 'error')
		}
	}, [dietDaysError])

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
		showSnackbar(`Welcome, ${userData.username}!`, 'success')
		setShowLoginForm({ show: false, activeTab: 'login' })
	}

	const handleLogout = () => {
		logout()
		setEditMode(false)
		setActiveTab('diets')
		setShowLoginForm({ show: false, activeTab: 'login' })
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

	const handleSubmitForm = async (dietDay: DietDay) => {
		try {
			const isUpdate = !!dietDay.id
			if (isUpdate) {
				await updateDietDay(dietDay)
				showSnackbar('Diet day updated successfully!', 'success')
			} else {
				await createDietDay(dietDay)
				showSnackbar('Diet day created successfully!', 'success')
			}
			setEditMode(false)
		} catch (error) {
			const message = error instanceof Error ? error.message : `Failed to ${dietDay.id ? 'update' : 'create'} diet day`
			showSnackbar(message, 'error')
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
