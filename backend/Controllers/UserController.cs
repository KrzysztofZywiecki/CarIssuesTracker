
using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Backend.DTOs;

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
            user.UserName = userDTO.Username;
            await userManager.UpdateAsync(user);
            return Ok(new UserDTO(user));
        }
        else
        {
            return Unauthorized();
        }
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteUser([FromQuery] string password)
    {
        var user = await userManager.GetUserAsync(User);
        if (user != null)
        {
            bool isPasswordCorrect = await userManager.CheckPasswordAsync(user, password);
            if (isPasswordCorrect)
            {
                await userManager.DeleteAsync(user);
                return NoContent();
            }
        }
        return Unauthorized();
    }

    [HttpPost]
    [Route("changePassword")]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
    {
        var user = await userManager.GetUserAsync(User);
        if (user != null)
        {
            var identityResult = await userManager.ChangePasswordAsync(user, changePasswordDTO.oldPassword, changePasswordDTO.newPassword);
            if (identityResult.Succeeded)
            {
                return Ok();
            }
        }
        return Unauthorized();
    }
}