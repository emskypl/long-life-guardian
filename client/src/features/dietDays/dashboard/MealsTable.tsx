import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, useMediaQuery, useTheme, Collapse, Box, IconButton } from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DietDayDetails from '../details/DietDayDetails'

type Props = {
	dietDays: DietDay[]
	selectDietDay: (id: string) => void
	cancelSelectedDietDay: () => void
	deleteDietDay: (id: string) => void
	openForm: (id: string) => void
}

export default function MealsTable({ dietDays, selectDietDay, cancelSelectedDietDay, openForm }: Props) {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const isTablet = useMediaQuery(theme.breakpoints.down('md'))
	const [expandedRow, setExpandedRow] = useState<string | null>(null)

	const handleRowClick = (id: string) => {
		if (expandedRow === id) {
			setExpandedRow(null)
			cancelSelectedDietDay()
		} else {
			setExpandedRow(id)
			selectDietDay(id)
		}
	}

	return (
		<TableContainer
			component={Paper}
			sx={{ overflowX: 'auto' }}>
			<Table
				sx={{ minWidth: { xs: 300, sm: 650 } }}
				size={isMobile ? 'small' : 'medium'}>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: 50 }}>
							<Chip
								label='Add'
								color='primary'
								size='medium'
								onClick={() => openForm('')}
							/>
						</TableCell>
						<TableCell>
							<strong>Date</strong>
						</TableCell>
						{!isMobile && (
							<>
								<TableCell>
									<strong>Breakfast</strong>
								</TableCell>
								<TableCell>
									<strong>Lunch</strong>
								</TableCell>
								<TableCell>
									<strong>Dinner</strong>
								</TableCell>
							</>
						)}
						{!isTablet && (
							<TableCell>
								<strong>Snacks</strong>
							</TableCell>
						)}
						{!isTablet && (
							<>
								<TableCell align='center'>
									<strong>Carbs</strong>
								</TableCell>
								<TableCell align='center'>
									<strong>Protein</strong>
								</TableCell>
								<TableCell align='center'>
									<strong>Fat</strong>
								</TableCell>
							</>
						)}
						<TableCell align='center'>
							<strong>Calories</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dietDays.map(dietDay => (
						<>
							<TableRow
								key={dietDay.id}
								hover
								onClick={() => handleRowClick(dietDay.id)}
								sx={{
									cursor: 'pointer',
									'&:last-child td, &:last-child th': { border: 0 },
									backgroundColor: expandedRow === dietDay.id ? 'action.selected' : 'inherit',
								}}>
								<TableCell>
									<IconButton
										size='small'
										onClick={e => {
											e.stopPropagation()
											handleRowClick(dietDay.id)
										}}>
										{expandedRow === dietDay.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
									</IconButton>
								</TableCell>
								<TableCell
									component='th'
									scope='row'>
									<Typography
										variant='body2'
										sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
										{format(new Date(dietDay.date), isMobile ? 'MM/dd' : 'MMM dd, yyyy')}
									</Typography>
								</TableCell>
								{!isMobile && (
									<>
										<TableCell>
											<Typography
												variant='body2'
												noWrap
												sx={{ maxWidth: { sm: 120, md: 150 } }}>
												{dietDay.breakfast.name || '-'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography
												variant='body2'
												noWrap
												sx={{ maxWidth: { sm: 120, md: 150 } }}>
												{dietDay.lunch.name || '-'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography
												variant='body2'
												noWrap
												sx={{ maxWidth: { sm: 120, md: 150 } }}>
												{dietDay.dinner.name || '-'}
											</Typography>
										</TableCell>
									</>
								)}
								{!isTablet && (
									<TableCell>
										<Typography
											variant='body2'
											noWrap
											sx={{ maxWidth: 150 }}>
											{dietDay.snacks.name || '-'}
										</Typography>
									</TableCell>
								)}
								{!isTablet && (
									<>
										<TableCell align='center'>
											<Typography
												variant='body2'
												color='text.secondary'>
												{dietDay.breakfast.products.reduce((acc, product) => acc + product.carbs, 0) +
													dietDay.lunch.products.reduce((acc, product) => acc + product.carbs, 0) +
													dietDay.dinner.products.reduce((acc, product) => acc + product.carbs, 0) +
													dietDay.snacks.products.reduce((acc, product) => acc + product.carbs, 0)}{' '}
												/ {dietDay.carbsTarget}
											</Typography>
										</TableCell>
										<TableCell align='center'>
											<Typography
												variant='body2'
												color='text.secondary'>
												{dietDay.breakfast.products.reduce((acc, product) => acc + product.protein, 0) +
													dietDay.lunch.products.reduce((acc, product) => acc + product.protein, 0) +
													dietDay.dinner.products.reduce((acc, product) => acc + product.protein, 0) +
													dietDay.snacks.products.reduce((acc, product) => acc + product.protein, 0)}{' '}
												/ {dietDay.proteinTarget}
											</Typography>
										</TableCell>
										<TableCell align='center'>
											<Typography
												variant='body2'
												color='text.secondary'>
												{dietDay.breakfast.products.reduce((acc, product) => acc + product.fat, 0) +
													dietDay.lunch.products.reduce((acc, product) => acc + product.fat, 0) +
													dietDay.dinner.products.reduce((acc, product) => acc + product.fat, 0) +
													dietDay.snacks.products.reduce((acc, product) => acc + product.fat, 0)}{' '}
												/ {dietDay.fatTarget}
											</Typography>
										</TableCell>
									</>
								)}
								<TableCell align='center'>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
										{dietDay.breakfast.products.reduce((acc, product) => acc + product.calories, 0) +
											dietDay.lunch.products.reduce((acc, product) => acc + product.calories, 0) +
											dietDay.dinner.products.reduce((acc, product) => acc + product.calories, 0) +
											dietDay.snacks.products.reduce((acc, product) => acc + product.calories, 0)}{' '}
										/ {dietDay.caloriesTarget}
									</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									style={{ paddingBottom: 0, paddingTop: 0 }}
									colSpan={10}>
									<Collapse
										in={expandedRow === dietDay.id}
										timeout='auto'
										unmountOnExit>
										<Box sx={{ margin: 2 }}>
											<DietDayDetails dietDay={dietDay} />
										</Box>
									</Collapse>
								</TableCell>
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
