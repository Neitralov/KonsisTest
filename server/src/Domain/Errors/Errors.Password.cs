namespace Domain.Errors;

public static class DomainErrors
{
    public static class Password
    {
        public static Error NotFound => Error.NotFound(
            code:        $"{nameof(Entities.Password)}.{nameof(NotFound)}",
            description: $"Пароль с таким ID не найден");
        
        public static Error InvalidEmail => Error.Validation(
            code:        $"{nameof(Entities.Password)}.{nameof(InvalidEmail)}",
            description: $"Название ресурса не является электронной почтой");
        
        public static Error TooShortSecret => Error.Validation(
            code:        $"{nameof(Entities.Password)}.{nameof(TooShortSecret)}",
            description: $"Пароль не должен быть короче {Entities.Password.MinSecretLength} символов");
        
        public static Error AlreadyExists => Error.Validation(
            code:        $"{nameof(Entities.Password)}.{nameof(AlreadyExists)}",
            description: $"Пароль для такого сайта/почты уже создан");
    }
}