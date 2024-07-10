namespace Domain.Interfaces;

public interface IPasswordRepository
{
    Task AddPassword(Password newPassword);
    Task<bool> IsPasswordExists(string title);
    Task<Password?> FindPasswordById(Guid passwordId);
    Task<List<Password>> GetPasswords();
}