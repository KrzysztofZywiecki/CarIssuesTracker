namespace Backend.DTOs;

public record ChangePasswordDTO(string oldPassword, string newPassword);