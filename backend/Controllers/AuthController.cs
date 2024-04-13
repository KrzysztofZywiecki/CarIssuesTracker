using System.Runtime.CompilerServices;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("auth")]
public class AuthController(
    UserManager<ApplicationUser> userManager, ITokenGenerationService tokenGenerationService, ApplicationDbContext applicationDbContext) : ControllerBase
{
    UserManager<ApplicationUser> userManager = userManager;
    ApplicationDbContext applicationDbContext = applicationDbContext;

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
    public async Task<ActionResult<TokensDTO>> LogIn([FromBody] LoginRequest loginRequest)
    {
        var user = await userManager.FindByEmailAsync(loginRequest.Email);
        if (user is not null)
        {
            var correctPassword = await userManager.CheckPasswordAsync(user, loginRequest.Password);
            if (correctPassword)
            {
                return Ok(await tokenGenerationService.GenerateTokenPairAsync(user));
            }
        }
        return Unauthorized();

    }

    [HttpPost]
    [Route("refresh")]
    public async Task<ActionResult<TokensDTO>> RefreshTokens([FromBody] RefreshTokenDTO refreshTokenDTO)
    {
        var user = await applicationDbContext.Users.Include(x => x.RefreshTokens)
            .FirstAsync(x => x.Id == refreshTokenDTO.userId);
        if (user is not null)
        {
            var validationSuccessful = await tokenGenerationService.ValidateRefreshToken(user, refreshTokenDTO.refreshToken);
            if (validationSuccessful)
            {
                var tokenPair = await tokenGenerationService.GenerateTokenPairAsync(user);
                return Ok(tokenPair);
            }
        }
        return Unauthorized();
    }

}