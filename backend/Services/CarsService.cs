using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

using Backend.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Backend.Exceptions;

public class CarsService(
    UserManager<ApplicationUser> userManager, IAuthorizationService authorizationService,
    ApplicationDbContext applicationDbContext) : ICarsService
{
    private UserManager<ApplicationUser> userManager = userManager;
    private IAuthorizationService authorizationService = authorizationService;
    private ApplicationDbContext applicationDbContext = applicationDbContext;

    private async Task<Car> GetCarAsync(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = applicationDbContext.Cars.Include(x => x.ApplicationUser).FirstOrDefault(x => x.Id == carId);
        if (car != null)
        {
            var authorizationResult = await authorizationService.AuthorizeAsync(userPrincipal, car, "SameOwnerPolicy");
            if (authorizationResult.Succeeded)
            {
                return car;
            }
            else
            {
                throw new UnauthorizedException();
            }
        }
        else
        {
            throw new ResourceNotFoundException();
        }
    }

    public async Task<CarDTO> CreateCar(ClaimsPrincipal userPrincipal, CreateCarDTO createCarDTO)
    {
        var userId = userManager.GetUserId(userPrincipal);
        var user = await applicationDbContext.Users.Include(x => x.Cars).FirstOrDefaultAsync(x => x.Id == userId);

        if (user != null)
        {
            var car = new Car
            {
                Name = createCarDTO.Name,
                Manufacturer = createCarDTO.Manufacturer,
                RegistrationNumber = createCarDTO.RegistrationNumber
            };
            user.Cars.Add(car);
            await applicationDbContext.SaveChangesAsync();
            return new CarDTO(car);
        }
        else
        {
            throw new UnauthorizedException();
        }
    }

    public async Task DeleteCar(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await GetCarAsync(userPrincipal, carId);
        applicationDbContext.Cars.Remove(car);
        await applicationDbContext.SaveChangesAsync();

    }

    public async Task<CarDTO> GetCar(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await GetCarAsync(userPrincipal, carId);
        return new CarDTO(car);
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

    public async Task<CarDTO> UpdateCar(ClaimsPrincipal userPrincipal, Guid carId, UpdateCarDTO updateCarDTO)
    {
        var car = await GetCarAsync(userPrincipal, carId);
        car.Name = updateCarDTO.Name;
        car.RegistrationNumber = updateCarDTO.RegistrationNumber;
        car.Manufacturer = updateCarDTO.Manufacturer;
        await applicationDbContext.SaveChangesAsync();
        return new CarDTO(car);
    }
}