namespace Domain.Entities;

public class Password
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Secret { get; private set; } = string.Empty;
    public bool IsEmail { get; private set; } 
    public DateTime CreationDate { get; private set; }

    public const int MinSecretLength = 8;
    
    private Password() { }

    public static ErrorOr<Password> Create(string title, string secret, bool isEmail, DateTime? creationDate = null)
    {
        List<Error> errors = [];

        if (isEmail && title.Contains('@') is false)
            errors.Add(DomainErrors.Password.InvalidEmail);
        
        if (secret.Length < MinSecretLength)
            errors.Add(DomainErrors.Password.TooShortSecret);
        
        if (errors.Count > 0)
            return errors;

        return new Password
        {
            Id = new Guid(),
            Title = title.Trim(),
            Secret = secret.Trim(),
            IsEmail = isEmail,
            CreationDate = creationDate ?? DateTime.UtcNow
        };
    }
}