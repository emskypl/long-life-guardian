type DietDay = {
	id: string
	date: string
	breakfast: Meal
	lunch: Meal
	dinner: Meal
	snacks: Meal
	proteinTarget: number
	carbsTarget: number
	fatTarget: number
	caloriesTarget: number
	userId: string
}

type Meal = {
	id: string
	name: string
	products: Product[]
}

type Product = {
	id: string
	name: string
	calories: number
	protein: number
	carbs: number
	fat: number
}

type User = {
	userId: string
	username: string
	token: string
	email: string
}
