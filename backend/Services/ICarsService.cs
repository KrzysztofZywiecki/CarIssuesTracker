
using System.Security.Claims;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

public interface ICarsService
{
    Task DeleteCar(ClaimsPrincipal userPrincipal, Guid carId);
    Task CreateCar(ClaimsPrincipal userPrincipal, CreateCarDTO createCarDTO);
}