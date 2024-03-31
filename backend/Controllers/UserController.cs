
using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers;

[Route("user")]
[Authorize]
public class UserController(UserManager<ApplicationUser> userManager) : ControllerBase
{
    readonly private UserManager<ApplicationUser> userManager = userManager;

    [HttpGet]
    [Route("info")]
    public async Task<ActionResult<UserDTO>> GetUserInfo()
    {
        var user = await userManager.GetUserAsync(User);

        if (user != null)
        {
            return new UserDTO(user);
        }
        else
        {
            return NotFound();
        }

    }
}