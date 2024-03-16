using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("issues")]
public class CarIssuesController : ControllerBase
{
    private readonly CarIssueContext carIssueContext;

    public CarIssuesController(CarIssueContext context)
    {
        carIssueContext = context;
    }

    [HttpGet]
    public CarIssue[] GetIssues()
    {
        return carIssueContext.CarIssues.Include(x => x.Owner).ToArray();
    }

    [HttpGet]
    [Route("/{Id}")]
    public CarIssue[] GetIssuesForUser(long Id)
    {
        return carIssueContext.CarIssues.Where(x => x.Owner.Id == Id).ToArray();
    }

    [HttpPost]
    [Route("/user")]
    public User AddUser(User user)
    {
        carIssueContext.Users.Add(user);
        carIssueContext.SaveChanges();
        return user;
    }

    [HttpPost]
    [Route("/specific")]
    public CarIssue? AddIssue(CarIssueDTO issue)
    {
        var user = carIssueContext.Users.Find(issue.OwnerId);
        if (user == null)
        {
            return null;
        }
        else
        {
            var createdIssue = new CarIssue
            {
                Id = 0,
                Description = issue.Description,
                Owner = user
            };
            carIssueContext.CarIssues.Add(createdIssue);
            carIssueContext.SaveChanges();

            return createdIssue;
        }
    }
}