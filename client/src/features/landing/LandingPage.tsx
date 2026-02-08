import { useState, useEffect } from 'react'
import { Box, Button, Container, Typography, Grid, Card, CardContent, Stack } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import InsightsIcon from '@mui/icons-material/Insights'
import LoginForm from './LoginForm'

type Props = {
	onLoginSuccess: (user: User) => void
	showLoginFormProp?: boolean
	setShowLoginForm?: (show: boolean) => void
}

export default function LandingPage({ onLoginSuccess, showLoginFormProp = false, setShowLoginForm }: Props) {
	const [showLoginForm, setShowLoginFormState] = useState(showLoginFormProp)
	const [initialTab, setInitialTab] = useState<'login' | 'register'>('login')

	// Update showLoginForm when prop changes
	useEffect(() => {
		if (showLoginFormProp) {
			setShowLoginFormState(true)
		} else {
			setShowLoginFormState(false)
		}
	}, [showLoginFormProp])

	const handleShowLogin = () => {
		setInitialTab('login')
		setShowLoginFormState(true)
		if (setShowLoginForm) {
			setShowLoginForm(true)
		}
	}

	const handleShowRegister = () => {
		setInitialTab('register')
		setShowLoginFormState(true)
		if (setShowLoginForm) {
			setShowLoginForm(true)
		}
	}

	if (showLoginForm) {
		return (
			<Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
				<Container maxWidth='lg'>
					<LoginForm
						onLoginSuccess={onLoginSuccess}
						initialTab={initialTab}
					/>
				</Container>
			</Box>
		)
	}

	return (
		<Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
			<Container maxWidth='lg'>
				<Box sx={{ textAlign: 'center', mb: 8 }}>
					<Typography
						variant='h2'
						component='h1'
						gutterBottom
						sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
						Long Life Guardian
					</Typography>
					<Typography
						variant='h5'
						color='text.secondary'
						sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
						Track your nutrition, monitor your health, and achieve your wellness goals with our comprehensive diet tracking system
					</Typography>
					<Stack
						direction='row'
						spacing={2}
						justifyContent='center'>
						<Button
							size='large'
							onClick={handleShowLogin}
							sx={{ px: 6, py: 2, fontSize: '1.1rem', borderRadius: 3, backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}>
							Sign In
						</Button>
						<Button
							size='large'
							onClick={handleShowRegister}
							sx={{ px: 6, py: 2, fontSize: '1.1rem', borderRadius: 3, backgroundColor: 'secondary.main', color: 'black', '&:hover': { backgroundColor: 'secondary.dark' } }}>
							Sign Up
						</Button>
					</Stack>
				</Box>

				<Grid
					container
					spacing={4}
					sx={{ mt: 4 }}>
					<Grid size={{ xs: 12, md: 4 }}>
						<Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
							<CardContent>
								<RestaurantIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
								<Typography
									variant='h6'
									gutterBottom
									sx={{ fontWeight: 600 }}>
									Track Your Meals
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'>
									Log your daily meals and monitor your nutritional intake with detailed breakdowns for breakfast, lunch, dinner, and snacks
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
							<CardContent>
								<FitnessCenterIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
								<Typography
									variant='h6'
									gutterBottom
									sx={{ fontWeight: 600 }}>
									Set Your Goals
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'>
									Define personalized targets for calories, protein, carbs, and fats to stay on track with your health objectives
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
							<CardContent>
								<InsightsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
								<Typography
									variant='h6'
									gutterBottom
									sx={{ fontWeight: 600 }}>
									Visualize Progress
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'>
									View your nutritional data through charts and graphs to understand your eating patterns and make informed decisions
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}
