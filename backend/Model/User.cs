namespace Backend.Models;

public class User(long Id, string Username, ICollection<Car> Cars)
{
    public User() : this(Id: 0, Username: "", Cars: []) { }


    public long Id { get; init; } = Id;
    public string Username { get; init; } = Username;
    public ICollection<Car> Cars { get; init; } = Cars;
}

