import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'

type Props = {
	dietDay: DietDay
	selectDietDay: (id: string) => void
	closeForm: () => void
}

export default function DietDayCard({ dietDay, selectDietDay, closeForm }: Props) {
	return (
		<Card>
			<CardContent>
				{dietDay.id}
				<Typography variant='h5'>Calories: {dietDay.caloriesTarget}</Typography>
				<Typography sx={{ color: 'text.secondary', mb: 1 }}>{dietDay.date}</Typography>
				<Typography variant='body2'>{dietDay.notes}</Typography>
				<Box sx={{ mt: 3 }} />
				<Typography variant='subtitle1'>Breakfast: {dietDay.breakfast}</Typography>
				<Typography variant='subtitle1'>Lunch: {dietDay.lunch}</Typography>
				<Typography variant='subtitle1'>Dinner: {dietDay.dinner}</Typography>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
				<Chip
					label={dietDay.caloriesActual}
					variant='outlined'
				/>
				<Button
					onClick={() => {
						selectDietDay(dietDay.id)
						closeForm()
					}}
					size='medium'
					variant='contained'>
					View
				</Button>
			</CardActions>
		</Card>
	)
}
