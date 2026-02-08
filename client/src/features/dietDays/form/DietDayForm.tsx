import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react'

type Props = {
	dietDay?: DietDay
	closeForm: () => void
	submitForm: (dietDay: DietDay) => void
}

export default function DietDayForm({ dietDay, closeForm, submitForm }: Props) {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const createMeal = (mealName: string): Meal => ({
			id: crypto.randomUUID(),
			name: mealName,
			products: [],
		})

		const updateMealName = (existingMeal: Meal | undefined, newName: string | null): Meal => {
			if (newName && existingMeal) {
				// Update existing meal name but preserve products
				return { ...existingMeal, name: newName }
			} else if (newName) {
				// Create new meal with new name
				return createMeal(newName)
			} else if (existingMeal) {
				// Keep existing meal as is
				return existingMeal
			} else {
				// Default empty meal
				return createMeal('')
			}
		}

		const newDietDay: DietDay = {
			id: dietDay?.id || '',
			date: dietDay?.date || new Date().toISOString(),
			breakfast: updateMealName(dietDay?.breakfast, formData.get('breakfast') as string),
			lunch: updateMealName(dietDay?.lunch, formData.get('lunch') as string),
			dinner: updateMealName(dietDay?.dinner, formData.get('dinner') as string),
			snacks: updateMealName(dietDay?.snacks, formData.get('snacks') as string),
			caloriesTarget: parseInt(formData.get('caloriesTarget') as string) || 0,
			proteinTarget: parseInt(formData.get('proteinTarget') as string) || 0,
			carbsTarget: parseInt(formData.get('carbsTarget') as string) || 0,
			fatTarget: parseInt(formData.get('fatTarget') as string) || 0,
		}

		submitForm(newDietDay)
	}

	return (
		<Paper sx={{ borderRadius: 5, padding: 2 }}>
			<Typography
				variant='h5'
				gutterBottom
				color='primary'>
				Create Diet Day
			</Typography>
			<Box
				component='form'
				onSubmit={handleSubmit}
				display='flex'
				flexDirection='column'
				sx={{ width: '100%' }}
				gap={2}>
				<Box
					display='flex'
					flexDirection={{ xs: 'column', sm: 'row' }}
					gap={2}>
					<TextField
						name='caloriesTarget'
						label='Calories Target'
						defaultValue={dietDay?.caloriesTarget}
						size='small'
					/>
					<TextField
						name='proteinTarget'
						label='Protein Target'
						defaultValue={dietDay?.proteinTarget}
						size='small'
					/>
					<TextField
						name='carbsTarget'
						label='Carbs Target'
						defaultValue={dietDay?.carbsTarget}
						size='small'
					/>
					<TextField
						name='fatTarget'
						label='Fat Target'
						defaultValue={dietDay?.fatTarget}
						size='small'
					/>
				</Box>
				<TextField
					name='breakfast'
					label='Breakfast'
					defaultValue={dietDay?.breakfast?.name}
					size='small'
				/>
				<TextField
					name='lunch'
					label='Lunch'
					defaultValue={dietDay?.lunch?.name}
					size='small'
				/>
				<TextField
					name='dinner'
					label='Dinner'
					defaultValue={dietDay?.dinner?.name}
					size='small'
				/>
				<TextField
					name='snacks'
					label='Snacks'
					defaultValue={dietDay?.snacks?.name}
					size='small'
				/>
				<Box
					display={'flex'}
					justifyContent={'end'}
					gap={3}>
					<Button
						color='inherit'
						onClick={closeForm}>
						Cancel
					</Button>
					<Button
						type='submit'
						color='success'
						variant='contained'>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}
