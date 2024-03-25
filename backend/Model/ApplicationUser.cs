using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class ApplicationUser(ICollection<Car> Cars) : IdentityUser
{
    public ApplicationUser() : this(Cars: []) { }

    public ICollection<Car> Cars { get; init; } = Cars;
}

public record CreateUserDTO(string Username);

public record UserDTO(string? Username)
{
    public UserDTO(ApplicationUser user) : this(Username: user.UserName) { }
}
