using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

    public Car? Car { get; set; }
    public Guid CarId { get; set; }
};

public record CreateCarIssueDTO(string Description, long CarId);

public record CarIssueDTO(
    string Description,
    DateTime CreateDateTime,
    DateTime? RepairDateTime,
    decimal? RepairCost)
{
    public CarIssueDTO(CarIssue issue) : this(
        Description: issue.Description,
        CreateDateTime: issue.CreateDateTime,
        RepairDateTime: issue.RepairDateTime,
        RepairCost: issue.RepairCost)
    { }
}