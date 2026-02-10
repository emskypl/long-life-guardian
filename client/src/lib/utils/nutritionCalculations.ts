export interface NutrientTotals {
	calories: number
	protein: number
	carbs: number
	fat: number
}

export const calculateMealNutrients = (meal: Meal | null | undefined): NutrientTotals => {
	if (!meal || !meal.products) {
		return { calories: 0, protein: 0, carbs: 0, fat: 0 }
	}

	return meal.products.reduce(
		(acc, product) => ({
			calories: acc.calories + product.calories,
			protein: acc.protein + product.protein,
			carbs: acc.carbs + product.carbs,
			fat: acc.fat + product.fat,
		}),
		{ calories: 0, protein: 0, carbs: 0, fat: 0 }
	)
}

export const calculateDayNutrients = (dietDay: DietDay): NutrientTotals => {
	const meals = [dietDay.breakfast, dietDay.lunch, dietDay.dinner, dietDay.snacks]

	return meals.reduce(
		(acc, meal) => {
			const nutrients = calculateMealNutrients(meal)
			return {
				calories: acc.calories + nutrients.calories,
				protein: acc.protein + nutrients.protein,
				carbs: acc.carbs + nutrients.carbs,
				fat: acc.fat + nutrients.fat,
			}
		},
		{ calories: 0, protein: 0, carbs: 0, fat: 0 }
	)
}

export const formatNutrientValue = (value: number): string => {
	return value.toFixed(0)
}
