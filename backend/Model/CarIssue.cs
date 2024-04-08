using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class CarIssue
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";

    public DateTime CreateDateTime { get; set; }

    public DateTime? RepairDateTime { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal? RepairCost { get; set; }

    public Guid CarId { get; set; }
};

public record CreateCarIssueDTO(
    string Title,
    string Description,
    DateTime CreateDateTime);

public record CarIssueDTO(
    Guid Id,
    string Title,
    string Description,
    DateTime CreateDateTime,
    DateTime? RepairDateTime,
    decimal? RepairCost)
{
    public CarIssueDTO(CarIssue issue) : this(
        Id: issue.Id,
        Title: issue.Title,
        Description: issue.Description,
        CreateDateTime: issue.CreateDateTime,
        RepairDateTime: issue.RepairDateTime,
        RepairCost: issue.RepairCost)
    { }
}

public record UpdateCarIssueDTO(
    string Title,
    string Description,
    DateTime CreateDateTime,
    DateTime? RepairDateTime,
    decimal? RepairCost
);