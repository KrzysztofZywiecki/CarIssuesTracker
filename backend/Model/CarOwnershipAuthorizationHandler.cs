using Backend.Models;
using Microsoft.AspNetCore.Authorization;

public class CarOwnershipAuthorizationHandler : AuthorizationHandler<SameAuthorRequirement, Car>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameAuthorRequirement requirement, Car resource)
    {
        if (context.User.Identity?.Name == resource.ApplicationUser.UserName)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}

public class SameAuthorRequirement : IAuthorizationRequirement { }