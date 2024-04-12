
using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("user")]
[Authorize]
public class UserController(UserManager<ApplicationUser> userManager) : ControllerBase
{
    readonly private UserManager<ApplicationUser> userManager = userManager;

    [HttpGet]
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

    [HttpPut]
    public async Task<ActionResult<UserDTO>> UpdateUserInfo([FromBody] UserDTO userDTO)
    {
        var user = await userManager.GetUserAsync(User);

        if (user != null)
        {
            user.Email = userDTO.Email;
            user.PhoneNumber = userDTO.PhoneNumber;
            user.UserName = userDTO.Username;
            await userManager.UpdateAsync(user);
            return Ok(new UserDTO(user));
        }
        else
        {
            return Unauthorized();
        }
    }
}