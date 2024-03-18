using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Backend.Models;

public class Car(long Id, string Name, ICollection<CarIssue> Issues)
{
    public Car() : this(Id: 0, Name: "", Issues: []) { }

    public long Id { get; init; } = Id;
    public string Name { get; set; } = Name;
    public ICollection<CarIssue> Issues { get; init; } = Issues;
}

public record CarDTO(long Id, string Name, ICollection<CarIssue> Issues)
{
    public CarDTO(Car other) : this(
        Id: other.Id,
        Name: other.Name,
        Issues: other.Issues)
    { }
}

public record CreateCarDTO(long OwnerId, string Name);