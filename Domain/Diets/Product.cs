namespace Domain.Diets;

public class Product
{
  public string Id { get; set; } = Guid.NewGuid().ToString();
  public required string Name { get; set; }
  public int Calories { get; set; }
  public int Protein { get; set; }
  public int Carbs { get; set; }
  public int Fat { get; set; }
}