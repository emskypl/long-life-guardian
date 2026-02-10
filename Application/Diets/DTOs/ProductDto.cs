namespace Application.Diets.DTOs;

public class ProductDto
{
    public string Id { get; set; } = string.Empty;
    public required string Name { get; set; }
    public int Calories { get; set; }
    public int Protein { get; set; }
    public int Carbs { get; set; }
    public int Fat { get; set; }
}
