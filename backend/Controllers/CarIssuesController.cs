using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("issues")]
[Authorize]
public class CarIssuesController(ICarIssuesService carIssuesService) : ControllerBase
{

    private readonly ICarIssuesService carIssuesService = carIssuesService;

    [Route("{CarId}")]
    [HttpGet]
    public async Task<ActionResult<CarIssueDTO[]>> GetCarIssues([FromRoute] Guid CarId)
    {
        var issues = await carIssuesService.GetCarIssues(User, CarId);
        return issues;
    }

    [HttpPost]
    [Route("{CarId}")]
    public async Task CreateNewIssue([FromRoute] Guid CarId, [FromBody] CreateCarIssueDTO createCarIssueDTO)
    {
        await carIssuesService.CreateCarIssue(User, CarId, createCarIssueDTO);
    }

    [HttpPut]
    [Route("{CarId}/{IssueId}")]
    public async Task UpdateCarIssue([FromRoute] Guid CarId, [FromRoute] Guid IssueId, [FromBody] UpdateCarIssueDTO carIssueDTO)
    {
        await carIssuesService.UpdateCarIssue(User, CarId, IssueId, carIssueDTO);
    }

}