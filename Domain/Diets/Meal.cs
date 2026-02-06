namespace Domain.Diets;

public class Meal
{
  public string Id { get; set; } = Guid.NewGuid().ToString();
  public required string Name { get; set; }
  public required List<Product> Products { get; set; }
}