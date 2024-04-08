using System.Security.Claims;
using Backend.Models;

public interface ICarIssuesService
{
    public Task<CarIssueDTO[]> GetCarIssues(ClaimsPrincipal userPrincipal, Guid carId);
    public Task CreateCarIssue(ClaimsPrincipal userPrincipal, Guid carId, CreateCarIssueDTO createCarIssueDTO);
    public Task RemoveCarIssue(ClaimsPrincipal userPrincipal, Guid carId, Guid carIssueId);
    public Task UpdateCarIssue(ClaimsPrincipal userPrincipal, Guid carId, Guid carIssueId, UpdateCarIssueDTO carIssueDTO);
}