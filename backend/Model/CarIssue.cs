
using System.Text.Json.Serialization;

namespace Backend.Models;

public record CarIssue
{
    public long Id { get; set; }
    public string Description { get; set; } = null!;

    // [JsonIgnore]
    public User Owner { get; set; } = null!;
};

public record CarIssueDTO
{
    public string Description { get; set; } = "";
    public long OwnerId { get; set; }
}