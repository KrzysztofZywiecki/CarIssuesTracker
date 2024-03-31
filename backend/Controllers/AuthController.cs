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
    public async Task LogOut([FromServices] SignInManager<ApplicationUser> signInManager)
    {
        await signInManager.SignOutAsync();
    }

}