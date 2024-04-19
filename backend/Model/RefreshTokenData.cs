public class RefreshTokenData(string token, DateTime expirationDate)
{
    public Guid Id { get; set; }
    public string Token { get; set; } = token;
    public DateTime ExpirationDate { get; set; } = expirationDate;
    public string ApplicationUserId { get; set; } = "";
}