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

		const formValues: { [key: string]: FormDataEntryValue } = {}
		formData.forEach((value, key) => {
			formValues[key] = value
		})

		if (dietDay) formValues.id = dietDay.id

		submitForm(formValues as unknown as DietDay)
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
