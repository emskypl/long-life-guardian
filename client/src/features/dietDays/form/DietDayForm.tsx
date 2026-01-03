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
		<Paper sx={{ borderRadius: 3, padding: 3 }}>
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
				gap={3}>
				<TextField
					name='caloriesTarget'
					label='Calories Target'
					defaultValue={dietDay?.caloriesTarget}
				/>
				<TextField
					name='notes'
					label='Notes'
					multiline
					rows={3}
					defaultValue={dietDay?.notes}
				/>
				<TextField
					name='date'
					label='Date'
					type='date'
					defaultValue={dietDay?.date}
				/>
				<TextField
					name='breakfast'
					label='Breakfast'
					defaultValue={dietDay?.breakfast}
				/>
				<TextField
					name='lunch'
					label='Lunch'
					defaultValue={dietDay?.lunch}
				/>
				<TextField
					name='dinner'
					label='Dinner'
					defaultValue={dietDay?.dinner}
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
