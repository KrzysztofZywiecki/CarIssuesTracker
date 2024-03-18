using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class CarIssue(long Id, string Description, decimal? RepairCost, DateTime CreateDateTime, DateTime? RepairDateTime, Car Car)
{
    public CarIssue() : this(
        Id: 0,
        Description: "",
        RepairCost: null,
        CreateDateTime: DateTime.Now,
        RepairDateTime: null,
        Car: null!)
    { }

    public long Id { get; set; } = Id;
    public string Description { get; init; } = Description;

    public DateTime CreateDateTime { get; init; } = CreateDateTime;

    public DateTime? RepairDateTime { get; set; } = RepairDateTime;

    [Column(TypeName = "decimal(8, 2)")]
    public decimal? RepairCost { get; set; } = RepairCost;

    public Car Car { get; init; } = Car;
};

public record CreateCarIssueDTO(string Description, long CarId);

public record CarIssueDTO(
    string Description,
    DateTime CreateDateTime,
    DateTime? RepairDateTime,
    decimal? RepairCost,
    long CarId)
{
    public CarIssueDTO(CarIssue issue) : this(
        Description: issue.Description,
        CreateDateTime: issue.CreateDateTime,
        RepairDateTime: issue.RepairDateTime,
        RepairCost: issue.RepairCost,
        CarId: issue.Car.Id)
    { }
}