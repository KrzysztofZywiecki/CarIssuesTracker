using System.Security.Cryptography.X509Certificates;

namespace Backend.Models;

public class Car(long Id, User Owner, ICollection<CarIssue> Issues)
{
    public Car() : this(Id: 0, Owner: null!, Issues: []) { }

    public long Id { get; init; } = Id;
    public User Owner { get; init; } = Owner;
    public ICollection<CarIssue> Issues { get; init; } = Issues;
}
