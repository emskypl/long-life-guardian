import { Box, Card, TableContainer, Typography } from '@mui/material'
import DietDayDetailsTable from './DietDayDetailsTable'
import { BarChart } from '@mui/x-charts/BarChart'
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart'
import type { DefaultizedPieValueType } from '@mui/x-charts/models'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
type Props = {
	dietDay: DietDay
}

export default function DietDayDetails({ dietDay }: Props) {
	const uData = [dietDay.carbsTarget, dietDay.proteinTarget, dietDay.fatTarget]
	const pData = [
		dietDay.breakfast.products.reduce((acc, product) => acc + product.carbs, 0) +
			dietDay.lunch.products.reduce((acc, product) => acc + product.carbs, 0) +
			dietDay.dinner.products.reduce((acc, product) => acc + product.carbs, 0) +
			dietDay.snacks.products.reduce((acc, product) => acc + product.carbs, 0),
		dietDay.breakfast.products.reduce((acc, product) => acc + product.protein, 0) +
			dietDay.lunch.products.reduce((acc, product) => acc + product.protein, 0) +
			dietDay.dinner.products.reduce((acc, product) => acc + product.protein, 0) +
			dietDay.snacks.products.reduce((acc, product) => acc + product.protein, 0),
		dietDay.breakfast.products.reduce((acc, product) => acc + product.fat, 0) +
			dietDay.lunch.products.reduce((acc, product) => acc + product.fat, 0) +
			dietDay.dinner.products.reduce((acc, product) => acc + product.fat, 0) +
			dietDay.snacks.products.reduce((acc, product) => acc + product.fat, 0),
	]

	const pDataCalories =
		dietDay.breakfast.products.reduce((acc, product) => acc + product.calories, 0) +
		dietDay.lunch.products.reduce((acc, product) => acc + product.calories, 0) +
		dietDay.dinner.products.reduce((acc, product) => acc + product.calories, 0) +
		dietDay.snacks.products.reduce((acc, product) => acc + product.calories, 0)

	const data = [
		{ label: 'Target calories', value: dietDay.caloriesTarget, color: '#0088FE' },
		{ label: 'Missing calories', value: pDataCalories, color: '#00C49F' },
	]
	const settings = {
		width: 200,
		height: 200,
		value: (pDataCalories / dietDay.caloriesTarget) * 100,
	}

	const TOTAL = data.map(item => item.value).reduce((a, b) => a + b, 0)

	const xLabels = ['Carbs', 'Protein', 'Fat']
	return (
		<>
			<TableContainer
				component={Card}
				sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, width: { xs: '100%', md: '60%' } }}>
					<DietDayDetailsTable
						dietDay={dietDay}
						mealType='breakfast'
					/>
					<DietDayDetailsTable
						dietDay={dietDay}
						mealType='lunch'
					/>
					<DietDayDetailsTable
						dietDay={dietDay}
						mealType='dinner'
					/>
					<DietDayDetailsTable
						dietDay={dietDay}
						mealType='snacks'
					/>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '40%' } }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '100%' }, height: 300 }}>
						<Typography variant='h6'>Calories</Typography>
						<Gauge
							{...settings}
							cornerRadius='50%'
							value={settings.value > 100 ? 100 : settings.value}
							valueMax={100}
							text={`${pDataCalories}/${dietDay.caloriesTarget}`}
							sx={theme => ({
								[`& .${gaugeClasses.valueText}`]: {
									fontSize: 25,
								},
								[`& .${gaugeClasses.valueArc}`]: {
									fill: settings.value > 100 ? '#ff0000' : '#52b202',
								},
								[`& .${gaugeClasses.referenceArc}`]: {
									fill: theme.palette.text.disabled,
								},
							})}
						/>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '100%' }, height: 300 }}>
						<BarChart
							series={[
								{ data: pData, label: 'Current', id: 'pvId', stack: '	total' },
								{ data: uData, label: 'Target', id: 'uvId', stack: 'total' },
							]}
							xAxis={[{ data: xLabels, height: 28 }]}
							yAxis={[{ width: 50 }]}
						/>
					</Box>
				</Box>
			</TableContainer>
		</>
	)
}

{
	/* <CardContent>
				<Typography variant='h5'>{dietDay.breakfast.name}</Typography>
				<Typography variant='body1'>Calories: {dietDay.caloriesTarget}</Typography>
				<Typography variant='body1'>Protein: {dietDay.proteinTarget}</Typography>
				<Typography variant='body1'>Carbs: {dietDay.carbsTarget}</Typography>
				<Typography variant='body1'>Fat: {dietDay.fatTarget}</Typography>
				<Typography variant='body2'>Products: {dietDay.breakfast.products.map(product => product.name).join(', ')}</Typography>
			</CardContent> */
}
