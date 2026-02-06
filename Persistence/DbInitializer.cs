using System;
using Domain.Diets;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.DietDays.Any()) return;

        // Create products (nutritional data)
        var oatmealProduct = new Product { Name = "Oatmeal with berries and almonds", Calories = 350, Protein = 12, Carbs = 55, Fat = 8 };
        var chickenSaladProduct = new Product { Name = "Grilled chicken salad with quinoa", Calories = 550, Protein = 45, Carbs = 40, Fat = 18 };
        var salmonProduct = new Product { Name = "Baked salmon with roasted vegetables", Calories = 650, Protein = 48, Carbs = 35, Fat = 32 };
        var yogurtProduct = new Product { Name = "Greek yogurt with honey", Calories = 200, Protein = 15, Carbs = 25, Fat = 3 };
        var avocadoToastProduct = new Product { Name = "Avocado toast with eggs", Calories = 420, Protein = 18, Carbs = 35, Fat = 24 };
        var turkeyWrapProduct = new Product { Name = "Turkey and vegetable wrap", Calories = 480, Protein = 32, Carbs = 48, Fat = 16 };
        var beefStirFryProduct = new Product { Name = "Lean beef stir-fry with brown rice", Calories = 680, Protein = 42, Carbs = 65, Fat = 22 };
        var appleProduct = new Product { Name = "Apple with peanut butter", Calories = 250, Protein = 8, Carbs = 28, Fat = 12 };
        var smoothieBowlProduct = new Product { Name = "Smoothie bowl with protein powder", Calories = 380, Protein = 28, Carbs = 45, Fat = 10 };
        var lentilSoupProduct = new Product { Name = "Lentil soup with whole grain bread", Calories = 420, Protein = 18, Carbs = 65, Fat = 8 };
        var fishTacosProduct = new Product { Name = "Grilled fish tacos with salsa", Calories = 520, Protein = 38, Carbs = 52, Fat = 16 };
        var mixedNutsProduct = new Product { Name = "Mixed nuts and dried fruit", Calories = 280, Protein = 8, Carbs = 32, Fat = 14 };
        var yogurtParfaitProduct = new Product { Name = "Greek yogurt parfait with granola", Calories = 320, Protein = 18, Carbs = 42, Fat = 9 };
        var buddahBowlProduct = new Product { Name = "Quinoa Buddha bowl with chickpeas", Calories = 580, Protein = 22, Carbs = 72, Fat = 20 };
        var chickenCurryProduct = new Product { Name = "Chicken curry with cauliflower rice", Calories = 590, Protein = 45, Carbs = 38, Fat = 26 };
        var carrotSticksProduct = new Product { Name = "Carrot sticks with hummus", Calories = 150, Protein = 5, Carbs = 18, Fat = 7 };
        var cerealProduct = new Product { Name = "Whole grain cereal with banana", Calories = 280, Protein = 8, Carbs = 58, Fat = 3 };
        var grilledSandwichProduct = new Product { Name = "Grilled vegetable and cheese sandwich", Calories = 450, Protein = 18, Carbs = 52, Fat = 18 };
        var porkTenderloinProduct = new Product { Name = "Pork tenderloin with sweet potato", Calories = 620, Protein = 48, Carbs = 55, Fat = 18 };
        var darkChocolateProduct = new Product { Name = "Dark chocolate square", Calories = 120, Protein = 2, Carbs = 12, Fat = 8 };
        var scrambledEggsProduct = new Product { Name = "Scrambled eggs with spinach and toast", Calories = 380, Protein = 22, Carbs = 28, Fat = 18 };
        var asianSaladProduct = new Product { Name = "Asian chicken salad with sesame dressing", Calories = 520, Protein = 38, Carbs = 32, Fat = 24 };
        var pastaProduct = new Product { Name = "Vegetarian pasta with marinara sauce", Calories = 580, Protein = 18, Carbs = 88, Fat = 16 };
        var trailMixProduct = new Product { Name = "Trail mix", Calories = 240, Protein = 8, Carbs = 22, Fat = 14 };
        var proteinPancakesProduct = new Product { Name = "Protein pancakes with berries", Calories = 420, Protein = 28, Carbs = 52, Fat = 12 };
        var mediterraneanBowlProduct = new Product { Name = "Mediterranean bowl with falafel", Calories = 620, Protein = 22, Carbs = 68, Fat = 26 };
        var grilledSteakProduct = new Product { Name = "Grilled steak with asparagus", Calories = 680, Protein = 52, Carbs = 18, Fat = 42 };
        var proteinShakeProduct = new Product { Name = "Protein shake", Calories = 200, Protein = 25, Carbs = 12, Fat = 5 };
        var chiaPuddingProduct = new Product { Name = "Chia seed pudding with mango", Calories = 320, Protein = 12, Carbs = 42, Fat = 14 };
        var tunaSaladProduct = new Product { Name = "Tuna salad with whole grain crackers", Calories = 450, Protein = 35, Carbs = 38, Fat = 16 };
        var herbChickenProduct = new Product { Name = "Herb-crusted chicken with quinoa", Calories = 580, Protein = 45, Carbs = 48, Fat = 18 };
        var bananaProduct = new Product { Name = "Banana with almond butter", Calories = 220, Protein = 6, Carbs = 28, Fat = 10 };
        var greenSmoothieProduct = new Product { Name = "Green smoothie with spinach and protein", Calories = 350, Protein = 25, Carbs = 38, Fat = 10 };
        var chickenSkewersProduct = new Product { Name = "Grilled chicken and vegetable skewers", Calories = 480, Protein = 42, Carbs = 28, Fat = 18 };
        var bakedCodProduct = new Product { Name = "Baked cod with lemon and herbs", Calories = 420, Protein = 45, Carbs = 22, Fat = 12 };
        var cottageCheeseProduct = new Product { Name = "Cottage cheese with cucumber", Calories = 180, Protein = 18, Carbs = 12, Fat = 5 };
        var steelCutOatsProduct = new Product { Name = "Steel-cut oats with cinnamon and apple", Calories = 340, Protein = 10, Carbs = 62, Fat = 6 };
        var blackBeanBowlProduct = new Product { Name = "Black bean and quinoa power bowl", Calories = 520, Protein = 22, Carbs = 75, Fat = 14 };
        var turkeyMeatballsProduct = new Product { Name = "Turkey meatballs with zucchini noodles", Calories = 480, Protein = 42, Carbs = 28, Fat = 20 };
        var yogurtBerriesProduct = new Product { Name = "Greek yogurt with berries", Calories = 200, Protein = 15, Carbs = 25, Fat = 3 };

        var dietDays = new List<DietDay>
        {
            new() {
                Date = DateTime.Today.AddDays(-7),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { oatmealProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { chickenSaladProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { salmonProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { yogurtProduct } },
                CaloriesTarget = 2000,
                Notes = "Felt energetic throughout the day"
            },
            new() {
                Date = DateTime.Today.AddDays(-6),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { avocadoToastProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { turkeyWrapProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { beefStirFryProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { appleProduct } },
                CaloriesTarget = 2000,
                Notes = "Had a small dessert after dinner"
            },
            new() {
                Date = DateTime.Today.AddDays(-5),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { smoothieBowlProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { lentilSoupProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { fishTacosProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { mixedNutsProduct } },
                CaloriesTarget = 2000,
                Notes = "Skipped evening snack"
            },
            new() {
                Date = DateTime.Today.AddDays(-4),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { yogurtParfaitProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { buddahBowlProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { chickenCurryProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { carrotSticksProduct } },
                CaloriesTarget = 2000,
                Notes = "Tried new curry recipe"
            },
            new() {
                Date = DateTime.Today.AddDays(-3),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { cerealProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { grilledSandwichProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { porkTenderloinProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { darkChocolateProduct } },
                CaloriesTarget = 2000,
                Notes = "Light dinner, wasn't very hungry"
            },
            new() {
                Date = DateTime.Today.AddDays(-2),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { scrambledEggsProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { asianSaladProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { pastaProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { trailMixProduct } },
                CaloriesTarget = 2000,
                Notes = "Weekend meal prep helped a lot"
            },
            new() {
                Date = DateTime.Today.AddDays(-1),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { proteinPancakesProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { mediterraneanBowlProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { grilledSteakProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { proteinShakeProduct } },
                CaloriesTarget = 2000,
                Notes = "Perfect calorie target hit!"
            },
            new() {
                Date = DateTime.Today,
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { chiaPuddingProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { tunaSaladProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { herbChickenProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { bananaProduct } },
                CaloriesTarget = 2000,
                Notes = "Still working on dinner"
            },
            new() {
                Date = DateTime.Today.AddDays(1),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { greenSmoothieProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { chickenSkewersProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { bakedCodProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { cottageCheeseProduct } },
                CaloriesTarget = 2000,
                Notes = "Meal prep planned for tomorrow"
            },
            new() {
                Date = DateTime.Today.AddDays(2),
                Breakfast = new Meal { Name = "Breakfast", Products = new List<Product> { steelCutOatsProduct } },
                Lunch = new Meal { Name = "Lunch", Products = new List<Product> { blackBeanBowlProduct } },
                Dinner = new Meal { Name = "Dinner", Products = new List<Product> { turkeyMeatballsProduct } },
                Snacks = new Meal { Name = "Snacks", Products = new List<Product> { yogurtBerriesProduct } },
                CaloriesTarget = 2000,
                Notes = "Planning to try new zucchini noodle recipe"
            }
        };

        context.DietDays.AddRange(dietDays);
        await context.SaveChangesAsync();
    }
}
