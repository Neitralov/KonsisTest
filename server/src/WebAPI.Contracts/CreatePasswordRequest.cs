namespace WebAPI.Contracts;

public record CreatePasswordRequest(string Title, string Secret, bool IsEmail)
{
    /// <example>example@gmail.com</example>
    public string Title { get; init; } = Title;
    /// <example>12345678</example>
    public string Secret { get; init; } = Secret;
    /// <example>true</example>
    public bool IsEmail { get; init; } = IsEmail;
}