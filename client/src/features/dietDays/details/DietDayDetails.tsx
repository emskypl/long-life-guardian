import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
type Props = {
	dietDay: DietDay
	cancelSelectActivity: () => void
	openForm: (id: string) => void
}

export default function DietDayDetails({ dietDay, cancelSelectActivity, openForm }: Props) {
	return (
		<Card>
			<CardContent>
				<Typography variant='h5'>{dietDay.breakfast.name}</Typography>
				<Typography variant='body1'>{dietDay.notes}</Typography>
				<Typography variant='body2'>Products: {dietDay.breakfast.products.map(product => product.name).join(', ')}</Typography>
			</CardContent>
			{/* <CardActions>
				<Button
					onClick={() => openForm(dietDay.id)}
					color='primary'>
					Edit
				</Button>
				<Button
					onClick={cancelSelectActivity}
					color='inherit'>
					Cancel
				</Button>
			</CardActions> */}
		</Card>
	)
}
