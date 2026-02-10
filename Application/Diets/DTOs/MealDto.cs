namespace Application.Diets.DTOs;

public class MealDto
{
    public string Id { get; set; } = string.Empty;
    public required string Name { get; set; }
    public required List<ProductDto> Products { get; set; }
}
