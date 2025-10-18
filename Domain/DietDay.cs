namespace Domain;

public class DietDay
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime Date { get; set; }
    public required string Breakfast { get; set; }
    public required string Lunch { get; set; }
    public required string Dinner { get; set; }
    public string? Snacks { get; set; }
    public int CaloriesTarget { get; set; }
    public int CaloriesActual { get; set; }
    public string? Notes { get; set; }
    public bool IsCompleted { get; set; }
}
