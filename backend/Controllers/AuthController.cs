using System.Runtime.CompilerServices;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class AuthController : ControllerBase
{
    [Authorize]
    [HttpPost("/logOut")]
    public async Task<ActionResult> LogOut([FromServices] SignInManager<ApplicationUser> signInManager,
    [FromBody] object empty)
    {
        if (empty != null)
        {
            var temp = signInManager.IsSignedIn(User);
            await signInManager.SignOutAsync();
            return NoContent();
        }
        return Unauthorized();
    }

}