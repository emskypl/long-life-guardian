import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
type Props = {
	dietDay: DietDay
	cancelSelectDietDay: () => void
	openForm: (id: string) => void
}

export default function DietDayDetails({ dietDay, cancelSelectDietDay, openForm }: Props) {
	return (
		
		<Card>
			<CardMedia
				component='img'
				src={`/images/culture.jpg`}
			/>
			<CardContent>
				<Typography variant='h5'>{dietDay.breakfast}</Typography>
				<Typography variant='subtitle1'>{dietDay.date}</Typography>
				<Typography variant='body1'>{dietDay.notes}</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => openForm(dietDay.id)}
					color='primary'>
					Edit
				</Button>
				<Button
					onClick={cancelSelectDietDay}
					color='inherit'>
					Cancel
				</Button>
			</CardActions>
		</Card>
	)
}
