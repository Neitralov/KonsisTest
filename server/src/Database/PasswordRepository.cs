namespace Database;

public class PasswordRepository(LiteDatabase database) : IPasswordRepository
{
    public Task AddPassword(Password newPassword)
    {
        var passwords = database.GetCollection<Password>();
        passwords.Insert(newPassword);
        
        return Task.CompletedTask;
    }

    public Task<bool> IsPasswordExists(string title)
    {
        var passwords = database.GetCollection<Password>();
        var isExists = passwords.Exists(password => password.Title == title);

        return Task.FromResult(isExists);
    }

    public Task<Password?> FindPasswordById(Guid passwordId)
    {
        var passwords = database.GetCollection<Password>();
        var password = passwords.FindById(passwordId);

        return Task.FromResult<Password?>(password);
    }

    public Task<List<Password>> GetPasswords()
    {
        var passwords = database.GetCollection<Password>();
        var orderedPasswords = passwords.Query().OrderByDescending(password => password.CreationDate).ToList();

        return Task.FromResult(orderedPasswords);
    }
}