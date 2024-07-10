namespace Domain.Services;

public class PasswordService(IPasswordRepository repository)
{
    public async Task<ErrorOr<Created>> StorePassword(Password newPassword)
    {
        if (await repository.IsPasswordExists(newPassword.Title))
            return DomainErrors.Password.AlreadyExists;

        await repository.AddPassword(newPassword);
        return Result.Created;
    }

    public async Task<ErrorOr<Password>> GetPassword(Guid passwordId)
    {
        var result = await repository.FindPasswordById(passwordId);

        return result is not null ? result : DomainErrors.Password.NotFound;
    }
    
    public async Task<List<Password>> GetPasswords()
    {
        return await repository.GetPasswords();
    }
}