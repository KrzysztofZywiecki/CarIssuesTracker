using System.Text.Json.Serialization;

namespace Backend.Models;

public record User
{
    public long Id { get; set; }
    public string Username { get; set; } = "";

    // [JsonIgnore]
    public ICollection<CarIssue> CarIssues { get; set; } = [];
}