using System.Runtime.CompilerServices;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("auth")]
public class AuthController(
    UserManager<ApplicationUser> userManager, ITokenGenerationService tokenGenerationService) : ControllerBase
{

    UserManager<ApplicationUser> userManager = userManager;

    ITokenGenerationService tokenGenerationService = tokenGenerationService;

    [HttpPost("logOut")]
    public async Task<ActionResult> LogOut([FromServices] SignInManager<ApplicationUser> signInManager)
    {
        var signedIn = signInManager.IsSignedIn(User);
        if (signedIn)
        {
            await signInManager.SignOutAsync();
        }
        return NoContent();
    }

    [HttpPost]
    [Route("logIn")]
    public async Task<ActionResult> LogIn([FromBody] LoginRequest loginRequest)
    {
        var user = await userManager.FindByEmailAsync(loginRequest.Email);
        if (user is not null)
        {
            var correctPassword = await userManager.CheckPasswordAsync(user, loginRequest.Password);
            if (correctPassword)
            {
                return Ok(tokenGenerationService.GenerateAccessToken(user));
            }
        }
        return Unauthorized();

    }

}