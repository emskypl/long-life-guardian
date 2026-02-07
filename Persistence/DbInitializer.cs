using Domain.Diets;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.DietDays.Any()) return;

        // Create products (nutritional data)
        var oatmealProduct = new Product { Name = "Oatmeal", Calories = 350, Protein = 12, Carbs = 55, Fat = 8 };
        var almondProduct = new Product { Name = "Almonds", Calories = 310, Protein = 32, Carbs = 15, Fat = 6 };
        var chickenSaladProduct = new Product { Name = "Grilled chicken", Calories = 550, Protein = 45, Carbs = 40, Fat = 18 };
        var salmonProduct = new Product { Name = "Baked salmon", Calories = 650, Protein = 48, Carbs = 35, Fat = 32 };
        var yogurtProduct = new Product { Name = "Greek yogurt", Calories = 200, Protein = 15, Carbs = 25, Fat = 3 };
        var avocadoToastProduct = new Product { Name = "Avocado toast", Calories = 420, Protein = 18, Carbs = 35, Fat = 24 };
        var turkeyWrapProduct = new Product { Name = "Turkey wrap", Calories = 480, Protein = 32, Carbs = 48, Fat = 16 };
        var beefStirFryProduct = new Product { Name = "Lean beef stir-fry", Calories = 680, Protein = 42, Carbs = 65, Fat = 22 };
        var appleProduct = new Product { Name = "Apple", Calories = 250, Protein = 8, Carbs = 28, Fat = 12 };
        var smoothieBowlProduct = new Product { Name = "Smoothie bowl", Calories = 380, Protein = 28, Carbs = 45, Fat = 10 };
        var lentilSoupProduct = new Product { Name = "Lentil soup", Calories = 420, Protein = 18, Carbs = 65, Fat = 8 };
        var fishTacosProduct = new Product { Name = "Grilled fish tacos", Calories = 520, Protein = 38, Carbs = 52, Fat = 16 };
        var mixedNutsProduct = new Product { Name = "Mixed nuts", Calories = 280, Protein = 8, Carbs = 32, Fat = 14 };
        var yogurtParfaitProduct = new Product { Name = "Greek yogurt", Calories = 320, Protein = 18, Carbs = 42, Fat = 9 };
        var saladProduct = new Product { Name = "Salad", Calories = 580, Protein = 22, Carbs = 72, Fat = 20 };
        var chickenCurryProduct = new Product { Name = "Chicken curry", Calories = 590, Protein = 45, Carbs = 38, Fat = 26 };
        var carrotSticksProduct = new Product { Name = "Carrot sticks", Calories = 150, Protein = 5, Carbs = 18, Fat = 7 };
        var cerealProduct = new Product { Name = "Whole grain cereal", Calories = 280, Protein = 8, Carbs = 58, Fat = 3 };
        var grilledSandwichProduct = new Product { Name = "Grilled vegetable", Calories = 450, Protein = 18, Carbs = 52, Fat = 18 };
        var porkTenderloinProduct = new Product { Name = "Pork tenderloin", Calories = 620, Protein = 48, Carbs = 55, Fat = 18 };
        var darkChocolateProduct = new Product { Name = "Dark chocolate", Calories = 120, Protein = 2, Carbs = 12, Fat = 8 };
        var scrambledEggsProduct = new Product { Name = "Scrambled eggs", Calories = 380, Protein = 22, Carbs = 28, Fat = 18 };
        var asianSaladProduct = new Product { Name = "Asian chicken salad", Calories = 520, Protein = 38, Carbs = 32, Fat = 24 };
        var pastaProduct = new Product { Name = "Vegetarian pasta", Calories = 580, Protein = 18, Carbs = 88, Fat = 16 };
        var trailMixProduct = new Product { Name = "Trail mix", Calories = 240, Protein = 8, Carbs = 22, Fat = 14 };
        var proteinPancakesProduct = new Product { Name = "Protein pancakes", Calories = 420, Protein = 28, Carbs = 52, Fat = 12 };
        var mediterraneanBowlProduct = new Product { Name = "Mediterranean bowl", Calories = 620, Protein = 22, Carbs = 68, Fat = 26 };
        var grilledSteakProduct = new Product { Name = "Grilled steak", Calories = 680, Protein = 52, Carbs = 18, Fat = 42 };
        var proteinShakeProduct = new Product { Name = "Protein shake", Calories = 200, Protein = 25, Carbs = 12, Fat = 5 };
        var chiaPuddingProduct = new Product { Name = "Chia seed pudding", Calories = 320, Protein = 12, Carbs = 42, Fat = 14 };
        var tunaSaladProduct = new Product { Name = "Tuna salad", Calories = 450, Protein = 35, Carbs = 38, Fat = 16 };
        var herbChickenProduct = new Product { Name = "Herb-crusted chicken", Calories = 580, Protein = 45, Carbs = 48, Fat = 18 };
        var bananaProduct = new Product { Name = "Banana", Calories = 220, Protein = 6, Carbs = 28, Fat = 10 };
        var greenSmoothieProduct = new Product { Name = "Green smoothie", Calories = 350, Protein = 25, Carbs = 38, Fat = 10 };
        var chickenSkewersProduct = new Product { Name = "Grilled chicken skewers", Calories = 480, Protein = 42, Carbs = 28, Fat = 18 };
        var bakedCodProduct = new Product { Name = "Baked cod", Calories = 420, Protein = 45, Carbs = 22, Fat = 12 };
        var cottageCheeseProduct = new Product { Name = "Cottage cheese", Calories = 180, Protein = 18, Carbs = 12, Fat = 5 };
        var steelCutOatsProduct = new Product { Name = "Steel-cut oats", Calories = 340, Protein = 10, Carbs = 62, Fat = 6 };
        var blackBeanBowlProduct = new Product { Name = "Black bean", Calories = 520, Protein = 22, Carbs = 75, Fat = 14 };
        var turkeyMeatballsProduct = new Product { Name = "Turkey meatballs", Calories = 480, Protein = 42, Carbs = 28, Fat = 20 };
        var berriesProduct = new Product { Name = "Berries", Calories = 200, Protein = 15, Carbs = 25, Fat = 3 };

        var dietDays = new List<DietDay>
        {
            new() {
                Date = DateTime.Today.AddDays(-7),
                Breakfast = new Meal { Name = "Oatmeal with almond butter", Products = new List<Product> { oatmealProduct, mixedNutsProduct } },
                Lunch = new Meal { Name = "Chicken salad", Products = new List<Product> { chickenSaladProduct, bananaProduct } },
                Dinner = new Meal { Name = "Baked salmon", Products = new List<Product> { salmonProduct, greenSmoothieProduct, bakedCodProduct } },
                Snacks = new Meal { Name = "Greek yogurt with berries", Products = new List<Product>() },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000,
            },
            new() {
                Date = DateTime.Today.AddDays(-6),
                Breakfast = new Meal { Name = "Scrambled eggs with avocado toast", Products = new List<Product> { avocadoToastProduct } },
                Lunch = new Meal { Name = "Turkey wrap", Products = new List<Product> { turkeyWrapProduct } },
                Dinner = new Meal { Name = "Beef stir-fry", Products = new List<Product> { beefStirFryProduct } },
                Snacks = new Meal { Name = "Apple", Products = new List<Product> { appleProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000,
            },
            new() {
                Date = DateTime.Today.AddDays(-5),
                Breakfast = new Meal { Name = "Smoothie bowl", Products = new List<Product> { smoothieBowlProduct } },
                Lunch = new Meal { Name = "Lentil soup", Products = new List<Product> { lentilSoupProduct } },
                Dinner = new Meal { Name = "Fish tacos", Products = new List<Product> { fishTacosProduct } },
                Snacks = new Meal { Name = "Mixed nuts", Products = new List<Product> { mixedNutsProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000,
            },
            new() {
                Date = DateTime.Today.AddDays(-4),
                Breakfast = new Meal { Name = "Yogurt parfait", Products = new List<Product> { yogurtParfaitProduct } },
                Lunch = new Meal { Name = "Buddha bowl", Products = new List<Product> { smoothieBowlProduct } },
                Dinner = new Meal { Name = "Chicken curry", Products = new List<Product> { chickenCurryProduct } },
                Snacks = new Meal { Name = "Carrot sticks", Products = new List<Product> { carrotSticksProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000,
            },
            new() {
                Date = DateTime.Today.AddDays(-3),
                Breakfast = new Meal { Name = "Cereal", Products = new List<Product> { cerealProduct } },
                Lunch = new Meal { Name = "Grilled sandwich", Products = new List<Product> { grilledSandwichProduct } },
                Dinner = new Meal { Name = "Pork tenderloin", Products = new List<Product> { porkTenderloinProduct } },
                Snacks = new Meal { Name = "Dark chocolate", Products = new List<Product> { darkChocolateProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000,
            },
            new() {
                Date = DateTime.Today.AddDays(-2),
                Breakfast = new Meal { Name = "Scrambled eggs", Products = new List<Product> { scrambledEggsProduct } },
                Lunch = new Meal { Name = "Asian salad", Products = new List<Product> { asianSaladProduct } },
                Dinner = new Meal { Name = "Pasta", Products = new List<Product> { pastaProduct } },
                Snacks = new Meal { Name = "Trail mix", Products = new List<Product> { trailMixProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000
            },
            new() {
                Date = DateTime.Today.AddDays(-1),
                Breakfast = new Meal { Name = "Protein pancakes", Products = new List<Product> { proteinPancakesProduct } },
                Lunch = new Meal { Name = "Mediterranean bowl", Products = new List<Product> { mediterraneanBowlProduct } },
                Dinner = new Meal { Name = "Grilled steak", Products = new List<Product> { grilledSteakProduct } },
                Snacks = new Meal { Name = "Protein shake", Products = new List<Product> { proteinShakeProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000
            },
            new() {
                Date = DateTime.Today,
                Breakfast = new Meal { Name = "Chia pudding", Products = new List<Product> { chiaPuddingProduct } },
                Lunch = new Meal { Name = "Tuna salad", Products = new List<Product> { tunaSaladProduct } },
                Dinner = new Meal { Name = "Herb chicken", Products = new List<Product> { herbChickenProduct } },
                Snacks = new Meal { Name = "Banana", Products = new List<Product> { bananaProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000
            },
            new() {
                Date = DateTime.Today.AddDays(1),
                Breakfast = new Meal { Name = "Green smoothie", Products = new List<Product> { greenSmoothieProduct, saladProduct, bananaProduct, mixedNutsProduct, chiaPuddingProduct, oatmealProduct, almondProduct } },
                Lunch = new Meal { Name = "Chicken skewers", Products = new List<Product> { chickenSkewersProduct } },
                Dinner = new Meal { Name = "Baked cod", Products = new List<Product> { bakedCodProduct } },
                Snacks = new Meal { Name = "Cottage cheese", Products = new List<Product> { cottageCheeseProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000
            },
            new() {
                Date = DateTime.Today.AddDays(2),
                Breakfast = new Meal { Name = "Steel cut oats", Products = new List<Product> { steelCutOatsProduct } },
                Lunch = new Meal { Name = "Black bean bowl", Products = new List<Product> { blackBeanBowlProduct } },
                Dinner = new Meal { Name = "Turkey meatballs", Products = new List<Product> { turkeyMeatballsProduct } },
                Snacks = new Meal { Name = "Yogurt with berries", Products = new List<Product> { yogurtProduct, berriesProduct } },
                FatTarget = 70,
                ProteinTarget = 150,
                CarbsTarget = 200,
                CaloriesTarget = 2000
            }
        };

        context.DietDays.AddRange(dietDays);
        await context.SaveChangesAsync();
    }
}
