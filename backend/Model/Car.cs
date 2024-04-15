namespace Backend.Models;

public class Car()
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string RegistrationNumber { get; set; } = "";
    public string Manufacturer { get; set; } = "";
    public ICollection<CarIssue> Issues { get; set; } = [];
    public string ApplicationUserId { get; set; } = "";
    public ApplicationUser? ApplicationUser { get; set; }
}

public record CarDTO(Guid Id, string Name, string RegistrationNumber, string Manufacturer)
{
    public CarDTO(Car other) : this(
        Id: other.Id,
        Name: other.Name,
        RegistrationNumber: other.RegistrationNumber,
        Manufacturer: other.Manufacturer)
    { }
}

public record CreateCarDTO(string Name, string Manufacturer, string RegistrationNumber);

public record UpdateCarDTO(string Name, string Manufacturer, string RegistrationNumber);