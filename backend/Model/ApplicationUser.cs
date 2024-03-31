using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class ApplicationUser() : IdentityUser
{
    public ICollection<Car> Cars { get; set; } = [];
}

public record UserDTO(string? Username)
{
    public UserDTO(ApplicationUser user) : this(Username: user.UserName) { }
}
