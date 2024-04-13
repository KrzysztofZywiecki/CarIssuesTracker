using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class ApplicationUser() : IdentityUser
{
    public ICollection<Car> Cars { get; set; } = [];

    public ICollection<RefreshTokenData> RefreshTokens { get; set; } = [];
}

[method: JsonConstructor]
public record UserDTO(string? Username, string? Email, string? PhoneNumber)
{
    public UserDTO(ApplicationUser user) : this(
        Username: user.UserName,
        Email: user.Email,
        PhoneNumber: user.PhoneNumber)
    { }
}
