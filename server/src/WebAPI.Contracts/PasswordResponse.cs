namespace WebAPI.Contracts;

public record PasswordResponse(Guid Id, string Title, string Secret, bool IsEmail, DateTime CreationDate)
{
    /// <example>98d275b3-f162-4aa6-8c55-b144e78df2a0</example>
    public Guid Id { get; init; } = Id;
    /// <example>example@gmail.com</example>
    public string Title { get; init; } = Title;
    /// <example>12345678</example>
    public string Secret { get; init; } = Secret;
    /// <example>true</example>
    public bool IsEmail { get; init; } = IsEmail;
    /// <example>2024-07-10T08:32:54.6385506Z</example>
    public DateTime CreationDate { get; init; } = CreationDate;
}