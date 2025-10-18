using System;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.DietDays.Any()) return;

        var dietDays = new List<DietDay>
        {
            new() {
                Date = DateTime.Today.AddDays(-7),
                Breakfast = "Oatmeal with berries and almonds",
                Lunch = "Grilled chicken salad with quinoa",
                Dinner = "Baked salmon with roasted vegetables",
                Snacks = "Greek yogurt with honey",
                CaloriesTarget = 2000,
                CaloriesActual = 1950,
                Notes = "Felt energetic throughout the day",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today.AddDays(-6),
                Breakfast = "Avocado toast with eggs",
                Lunch = "Turkey and vegetable wrap",
                Dinner = "Lean beef stir-fry with brown rice",
                Snacks = "Apple with peanut butter",
                CaloriesTarget = 2000,
                CaloriesActual = 2100,
                Notes = "Had a small dessert after dinner",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today.AddDays(-5),
                Breakfast = "Smoothie bowl with protein powder",
                Lunch = "Lentil soup with whole grain bread",
                Dinner = "Grilled fish tacos with salsa",
                Snacks = "Mixed nuts and dried fruit",
                CaloriesTarget = 2000,
                CaloriesActual = 1900,
                Notes = "Skipped evening snack",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today.AddDays(-4),
                Breakfast = "Greek yogurt parfait with granola",
                Lunch = "Quinoa Buddha bowl with chickpeas",
                Dinner = "Chicken curry with cauliflower rice",
                Snacks = "Carrot sticks with hummus",
                CaloriesTarget = 2000,
                CaloriesActual = 2050,
                Notes = "Tried new curry recipe",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today.AddDays(-3),
                Breakfast = "Whole grain cereal with banana",
                Lunch = "Grilled vegetable and cheese sandwich",
                Dinner = "Pork tenderloin with sweet potato",
                Snacks = "Dark chocolate square",
                CaloriesTarget = 2000,
                CaloriesActual = 1850,
                Notes = "Light dinner, wasn't very hungry",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today.AddDays(-2),
                Breakfast = "Scrambled eggs with spinach and toast",
                Lunch = "Asian chicken salad with sesame dressing",
                Dinner = "Vegetarian pasta with marinara sauce",
                Snacks = "Trail mix",
                CaloriesTarget = 2000,
                CaloriesActual = 2150,
                Notes = "Weekend meal prep helped a lot",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today.AddDays(-1),
                Breakfast = "Protein pancakes with berries",
                Lunch = "Mediterranean bowl with falafel",
                Dinner = "Grilled steak with asparagus",
                Snacks = "Protein shake",
                CaloriesTarget = 2000,
                CaloriesActual = 2000,
                Notes = "Perfect calorie target hit!",
                IsCompleted = true
            },
            new() {
                Date = DateTime.Today,
                Breakfast = "Chia seed pudding with mango",
                Lunch = "Tuna salad with whole grain crackers",
                Dinner = "Herb-crusted chicken with quinoa",
                Snacks = "Banana with almond butter",
                CaloriesTarget = 2000,
                CaloriesActual = 1200,
                Notes = "Still working on dinner",
                IsCompleted = false
            },
            new() {
                Date = DateTime.Today.AddDays(1),
                Breakfast = "Green smoothie with spinach and protein",
                Lunch = "Grilled chicken and vegetable skewers",
                Dinner = "Baked cod with lemon and herbs",
                Snacks = "Cottage cheese with cucumber",
                CaloriesTarget = 2000,
                CaloriesActual = 0,
                Notes = "Meal prep planned for tomorrow",
                IsCompleted = false
            },
            new() {
                Date = DateTime.Today.AddDays(2),
                Breakfast = "Steel-cut oats with cinnamon and apple",
                Lunch = "Black bean and quinoa power bowl",
                Dinner = "Turkey meatballs with zucchini noodles",
                Snacks = "Greek yogurt with berries",
                CaloriesTarget = 2000,
                CaloriesActual = 0,
                Notes = "Planning to try new zucchini noodle recipe",
                IsCompleted = false
            }
        };

        context.DietDays.AddRange(dietDays);
        await context.SaveChangesAsync();
    }
}
