using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

public class CarOwnershipAuthorizationHandler(UserManager<ApplicationUser> userManager) : AuthorizationHandler<SameAuthorRequirement, Car>
{

    private readonly UserManager<ApplicationUser> userManager = userManager;
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, SameAuthorRequirement requirement, Car resource)
    {
        var user = await userManager.GetUserAsync(context.User);
        if (user is null || resource.ApplicationUser is null)
        {
            return;
        }
        if (user.Id == resource.ApplicationUser.Id)
        {
            context.Succeed(requirement);
        }
    }
}

public class SameAuthorRequirement : IAuthorizationRequirement { }