using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

using Backend.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.Arm;
using Microsoft.OpenApi.Exceptions;

public class CarsService(
    UserManager<ApplicationUser> userManager, IAuthorizationService authorizationService,
    ApplicationDbContext applicationDbContext) : ICarsService
{
    private UserManager<ApplicationUser> userManager = userManager;
    private IAuthorizationService authorizationService = authorizationService;
    private ApplicationDbContext applicationDbContext = applicationDbContext;

    public async Task CreateCar(ClaimsPrincipal userPrincipal, CreateCarDTO createCarDTO)
    {
        var userId = userManager.GetUserId(userPrincipal);
        var user = await applicationDbContext.Users.Include(x => x.Cars).FirstAsync(x => x.Id == userId);

        if (user != null)
        {
            var car = new Car { Name = createCarDTO.Name };
            user.Cars.Add(car);
            await applicationDbContext.SaveChangesAsync();
        }
        else
        {
            throw new Exception("User is unauthorized");
        }
    }

    public async Task DeleteCar(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await applicationDbContext.Cars.Include(x => x.ApplicationUser).FirstAsync(x => x.Id == carId);
        if (car != null)
        {
            var authorizationResult = await authorizationService.AuthorizeAsync(userPrincipal, car, "SameOwnerPolicy");
            if (authorizationResult.Succeeded)
            {
                applicationDbContext.Cars.Remove(car);
                await applicationDbContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("User is unauthorized");
            }
        }
        else
        {
            throw new Exception("Car not found");
        }

    }

    public async Task<CarDTO> GetCar(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await applicationDbContext.Cars
            .Include(x => x.ApplicationUser)
            .FirstAsync();
        if (car != null)
        {
            var authorizationResult = await authorizationService.AuthorizeAsync(userPrincipal, car, "SameOwnerPolicy");
            if (authorizationResult.Succeeded)
            {
                return new CarDTO(car);
            }
            else
            {
                throw new Exception("User is unauthorized");
            }
        }
        else
        {
            throw new Exception("Car not found");
        }
    }

    public Task<CarIssueDTO[]> GetCarIssues(ClaimsPrincipal userPrincipal, Guid carId)
    {
        throw new Exception("Unimplemented error");
        // var car = await applicationDbContext.CarIssues.Where(x => Car)
    }

    public async Task<CarDTO[]> GetUserCars(ClaimsPrincipal userPrincipal)
    {
        var userId = userManager.GetUserId(userPrincipal);
        var cars = await applicationDbContext.Cars
            .Where(x => x.ApplicationUserId == userId)
            .Select(x => new CarDTO(x))
            .ToArrayAsync();
        return cars;
    }


}