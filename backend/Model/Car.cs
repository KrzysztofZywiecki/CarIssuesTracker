namespace Backend.Models;

public class Car()
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public ICollection<CarIssue> Issues { get; set; } = [];
    public string ApplicationUserId { get; set; } = "";
    public ApplicationUser ApplicationUser { get; set; } = null!;
}

public record CarDTO(Guid Id, string Name)
{
    public CarDTO(Car other) : this(
        Id: other.Id,
        Name: other.Name)
    { }
}

public record CreateCarDTO(string Name);

public record UpdateCarDTO(string Name);