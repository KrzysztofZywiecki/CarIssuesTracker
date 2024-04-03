using System.Runtime.CompilerServices;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class AuthController : ControllerBase
{
    [HttpPost("/logOut")]
    public async Task<ActionResult> LogOut([FromServices] SignInManager<ApplicationUser> signInManager)
    {
        var signedIn = signInManager.IsSignedIn(User);
        if (signedIn)
        {
            await signInManager.SignOutAsync();
        }
        return NoContent();
    }

}