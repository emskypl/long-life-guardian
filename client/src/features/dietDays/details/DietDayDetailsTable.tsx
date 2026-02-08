import { Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Card } from '@mui/material'
type Props = {
	dietDay: DietDay
	mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks'
}

export default function DietDayDetailsTable({ dietDay, mealType }: Props) {
	return (
		<>
			<Typography
				variant='h6'
				width={'100%'}
				align='center'>
				{mealType.charAt(0).toUpperCase() + mealType.slice(1)}
			</Typography>
			<TableContainer component={Card}>
				<Table
					size='small'
					sx={{ width: '100%', mb: '20px' }}>
					<TableHead>
						<TableRow>
							<TableCell align='center'>
								<strong>Product</strong>
							</TableCell>
							<TableCell
								align='center'
								width='100px'>
								<strong>Calories</strong>
							</TableCell>
							<TableCell
								align='center'
								width='100px'>
								<strong>Carbs</strong>
							</TableCell>
							<TableCell
								align='center'
								width='100px'>
								<strong>Protein</strong>
							</TableCell>
							<TableCell
								align='center'
								width='100px'>
								<strong>Fat</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dietDay[mealType]?.products.map(product => (
							<TableRow
								key={product.id}
								hover>
								<TableCell align='center'>{product.name}</TableCell>
								<TableCell
									align='center'
									width='100px'>
									{product.calories}
								</TableCell>
								<TableCell
									align='center'
									width='100px'>
									{product.carbs}
								</TableCell>
								<TableCell
									align='center'
									width='100px'>
									{product.protein}
								</TableCell>
								<TableCell
									align='center'
									width='100px'>
									{product.fat}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
