namespace Domain.Diets;

public class DietDay
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime Date { get; set; }
    public Meal? Breakfast { get; set; }
    public Meal? Lunch { get; set; }
    public Meal? Dinner { get; set; }
    public Meal? Snacks { get; set; }
    public int ProteinTarget { get; set; }
    public int CarbsTarget { get; set; }
    public int FatTarget { get; set; }
    public int CaloriesTarget { get; set; }
    public string? Notes { get; set; }
}
