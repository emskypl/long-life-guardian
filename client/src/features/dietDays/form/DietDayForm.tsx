import { Box, Button, Paper, TextField, Typography } from '@mui/material'

type Props = {
	dietDay?: DietDay
	closeForm: () => void
}

export default function DietDayForm({ dietDay, closeForm }: Props) {
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
				display='flex'
				flexDirection='column'
				gap={3}>
				<TextField
					label='Calories Target'
					defaultValue={dietDay?.caloriesTarget}
				/>
				<TextField
					label='Notes'
					multiline
					rows={3}
					defaultValue={dietDay?.notes}
				/>
				<TextField
					label='Date'
					type='date'
					defaultValue={dietDay?.date}
				/>
				<TextField
					label='Breakfast'
					defaultValue={dietDay?.breakfast}
				/>
				<TextField
					label='Lunch'
					defaultValue={dietDay?.lunch}
				/>
				<TextField
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
						color='success'
						variant='contained'>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}
