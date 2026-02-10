namespace Application.Diets.DTOs;

public class DietDayDto
{
    public string Id { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public MealDto? Breakfast { get; set; }
    public MealDto? Lunch { get; set; }
    public MealDto? Dinner { get; set; }
    public MealDto? Snacks { get; set; }
    public int ProteinTarget { get; set; }
    public int CarbsTarget { get; set; }
    public int FatTarget { get; set; }
    public int CaloriesTarget { get; set; }
}
