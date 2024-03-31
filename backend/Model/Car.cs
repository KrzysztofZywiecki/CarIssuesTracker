using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Components;

namespace Backend.Models;

public class Car()
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public ICollection<CarIssue> Issues { get; init; } = [];
}

public record CarDTO(Guid Id, string Name, ICollection<CarIssue> Issues)
{
    public CarDTO(Car other) : this(
        Id: other.Id,
        Name: other.Name,
        Issues: other.Issues)
    { }
}

public record CreateCarDTO(string OwnerId, string Name);