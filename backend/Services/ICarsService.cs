
using System.Security.Claims;
using Backend.Models;

public interface ICarsService
{
    Task<CarDTO> GetCar(ClaimsPrincipal userPrincipal, Guid carId);
    Task DeleteCar(ClaimsPrincipal userPrincipal, Guid carId);
    Task CreateCar(ClaimsPrincipal userPrincipal, CreateCarDTO createCarDTO);
    Task<CarDTO[]> GetUserCars(ClaimsPrincipal userPrincipal);
    Task<CarIssueDTO[]> GetCarIssues(ClaimsPrincipal userPrincipal, Guid carId);
}