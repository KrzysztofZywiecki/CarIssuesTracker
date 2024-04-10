
using System.Security.Claims;
using Backend.Models;

public interface ICarsService
{
    Task<CarDTO> GetCar(ClaimsPrincipal userPrincipal, Guid carId);
    Task DeleteCar(ClaimsPrincipal userPrincipal, Guid carId);
    Task<CarDTO> CreateCar(ClaimsPrincipal userPrincipal, CreateCarDTO createCarDTO);
    Task<CarDTO> UpdateCar(ClaimsPrincipal userPrincipal, Guid carId, UpdateCarDTO updateCarDTO);
    Task<CarDTO[]> GetUserCars(ClaimsPrincipal userPrincipal);
}