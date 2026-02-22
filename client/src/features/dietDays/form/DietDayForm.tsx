import { Box, Button, Paper, TextField, Typography, IconButton, Divider } from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useState, type FormEvent } from 'react'

type Props = {
	dietDay?: DietDay
	closeForm: () => void
	submitForm: (dietDay: DietDay) => void
}

export default function DietDayForm({ dietDay, closeForm, submitForm }: Props) {
	const [breakfastProducts, setBreakfastProducts] = useState<Product[]>(dietDay?.breakfast?.products || [])
	const [lunchProducts, setLunchProducts] = useState<Product[]>(dietDay?.lunch?.products || [])
	const [dinnerProducts, setDinnerProducts] = useState<Product[]>(dietDay?.dinner?.products || [])
	const [snacksProducts, setSnacksProducts] = useState<Product[]>(dietDay?.snacks?.products || [])

	const createEmptyProduct = (): Product => ({
		id: crypto.randomUUID(),
		name: '',
		calories: 0,
		protein: 0,
		carbs: 0,
		fat: 0,
	})

	const addProduct = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
		const newProduct = createEmptyProduct()
		switch (mealType) {
			case 'breakfast':
				setBreakfastProducts([...breakfastProducts, newProduct])
				break
			case 'lunch':
				setLunchProducts([...lunchProducts, newProduct])
				break
			case 'dinner':
				setDinnerProducts([...dinnerProducts, newProduct])
				break
			case 'snacks':
				setSnacksProducts([...snacksProducts, newProduct])
				break
		}
	}

	const removeProduct = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', productId: string) => {
		switch (mealType) {
			case 'breakfast':
				setBreakfastProducts(breakfastProducts.filter(p => p.id !== productId))
				break
			case 'lunch':
				setLunchProducts(lunchProducts.filter(p => p.id !== productId))
				break
			case 'dinner':
				setDinnerProducts(dinnerProducts.filter(p => p.id !== productId))
				break
			case 'snacks':
				setSnacksProducts(snacksProducts.filter(p => p.id !== productId))
				break
		}
	}

	const updateProduct = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', productId: string, field: keyof Product, value: string | number) => {
		const updateProducts = (products: Product[]) => products.map(p => (p.id === productId ? { ...p, [field]: value } : p))

		switch (mealType) {
			case 'breakfast':
				setBreakfastProducts(updateProducts(breakfastProducts))
				break
			case 'lunch':
				setLunchProducts(updateProducts(lunchProducts))
				break
			case 'dinner':
				setDinnerProducts(updateProducts(dinnerProducts))
				break
			case 'snacks':
				setSnacksProducts(updateProducts(snacksProducts))
				break
		}
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const createMeal = (mealName: string, products: Product[]): Meal => {
			const mealKey = mealName.toLowerCase() as 'breakfast' | 'lunch' | 'dinner' | 'snacks'
			const existingMeal = dietDay?.[mealKey]
			return {
				id: existingMeal && typeof existingMeal === 'object' && 'id' in existingMeal ? existingMeal.id : crypto.randomUUID(),
				name: mealName,
				products,
			}
		}

		const newDietDay: DietDay = {
			id: dietDay?.id || '',
			date: dietDay?.date || new Date().toISOString(),
			breakfast: createMeal((formData.get('breakfast') as string) || 'Breakfast', breakfastProducts),
			lunch: createMeal((formData.get('lunch') as string) || 'Lunch', lunchProducts),
			dinner: createMeal((formData.get('dinner') as string) || 'Dinner', dinnerProducts),
			snacks: createMeal((formData.get('snacks') as string) || 'Snacks', snacksProducts),
			caloriesTarget: parseInt(formData.get('caloriesTarget') as string) || 0,
			proteinTarget: parseInt(formData.get('proteinTarget') as string) || 0,
			carbsTarget: parseInt(formData.get('carbsTarget') as string) || 0,
			fatTarget: parseInt(formData.get('fatTarget') as string) || 0,
			userId: dietDay?.userId || '',
		}

		submitForm(newDietDay)
	}

	const renderMealProducts = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', products: Product[], mealLabel: string) => (
		<Box>
			<Box
				display='flex'
				alignItems='center'
				gap={1}
				mb={1}>
				<TextField
					name={mealType}
					label={`${mealLabel} Name`}
					defaultValue={dietDay?.[mealType]?.name || mealLabel}
					size='small'
					sx={{ flexGrow: 1 }}
				/>
				<Button
					variant='outlined'
					startIcon={<AddIcon />}
					onClick={() => addProduct(mealType)}
					size='small'>
					Add Product
				</Button>
			</Box>
			{products.length > 0 && (
				<Box sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
					{products.map((product, index) => (
						<Paper
							key={product.id}
							variant='outlined'
							sx={{ p: 1.5 }}>
							<Box
								display='flex'
								alignItems='center'
								gap={1}
								mb={1}>
								<Typography
									variant='caption'
									sx={{ minWidth: 80 }}>
									Product {index + 1}
								</Typography>
								<TextField
									label='Name'
									size='small'
									value={product.name}
									onChange={e => updateProduct(mealType, product.id, 'name', e.target.value)}
									sx={{ flexGrow: 1 }}
								/>
								<IconButton
									size='small'
									color='error'
									onClick={() => removeProduct(mealType, product.id)}>
									<DeleteIcon fontSize='small' />
								</IconButton>
							</Box>
							<Box
								display='flex'
								gap={1}>
								<TextField
									label='Calories'
									type='number'
									size='small'
									value={product.calories}
									onChange={e => updateProduct(mealType, product.id, 'calories', parseInt(e.target.value) || 0)}
									sx={{ flex: 1 }}
								/>
								<TextField
									label='Protein (g)'
									type='number'
									size='small'
									value={product.protein}
									onChange={e => updateProduct(mealType, product.id, 'protein', parseInt(e.target.value) || 0)}
									sx={{ flex: 1 }}
								/>
								<TextField
									label='Carbs (g)'
									type='number'
									size='small'
									value={product.carbs}
									onChange={e => updateProduct(mealType, product.id, 'carbs', parseInt(e.target.value) || 0)}
									sx={{ flex: 1 }}
								/>
								<TextField
									label='Fat (g)'
									type='number'
									size='small'
									value={product.fat}
									onChange={e => updateProduct(mealType, product.id, 'fat', parseInt(e.target.value) || 0)}
									sx={{ flex: 1 }}
								/>
							</Box>
						</Paper>
					))}
				</Box>
			)}
		</Box>
	)

	return (
		<Paper sx={{ borderRadius: 5, padding: 2 }}>
			<Typography
				variant='h5'
				gutterBottom
				color='primary'>
				{dietDay ? 'Edit Diet Day' : 'Create Diet Day'}
			</Typography>
			<Box
				component='form'
				onSubmit={handleSubmit}
				display='flex'
				flexDirection='column'
				sx={{ width: '100%' }}
				gap={2}>
				{/* Daily Targets */}
				<Box>
					<Typography
						variant='subtitle1'
						gutterBottom>
						Daily Targets
					</Typography>
					<Box
						display='flex'
						flexDirection={{ xs: 'column', sm: 'row' }}
						gap={2}>
						<TextField
							name='caloriesTarget'
							label='Calories Target'
							type='number'
							defaultValue={dietDay?.caloriesTarget || 2000}
							size='small'
							sx={{ flex: 1 }}
						/>
						<TextField
							name='proteinTarget'
							label='Protein Target (g)'
							type='number'
							defaultValue={dietDay?.proteinTarget || 150}
							size='small'
							sx={{ flex: 1 }}
						/>
						<TextField
							name='carbsTarget'
							label='Carbs Target (g)'
							type='number'
							defaultValue={dietDay?.carbsTarget || 200}
							size='small'
							sx={{ flex: 1 }}
						/>
						<TextField
							name='fatTarget'
							label='Fat Target (g)'
							type='number'
							defaultValue={dietDay?.fatTarget || 65}
							size='small'
							sx={{ flex: 1 }}
						/>
					</Box>
				</Box>

				<Divider />

				{/* Meals */}
				<Box
					display='flex'
					flexDirection='column'
					gap={3}>
					<Typography variant='subtitle1'>Meals & Products</Typography>

					{renderMealProducts('breakfast', breakfastProducts, 'Breakfast')}
					<Divider />

					{renderMealProducts('lunch', lunchProducts, 'Lunch')}
					<Divider />

					{renderMealProducts('dinner', dinnerProducts, 'Dinner')}
					<Divider />

					{renderMealProducts('snacks', snacksProducts, 'Snacks')}
				</Box>
				<Divider />
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
						{dietDay ? 'Update' : 'Create'}
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}
