namespace WebAPI.Controllers;

/// <inheritdoc />
[Route("/api/passwords")]
public class PasswordsController(PasswordService passwordService) : ApiController
{
    /// <summary>Добавить новый пароль</summary>
    /// <response code="201">Пароль успешно создан</response>
    /// <response code="400">
    /// Содержимое Title не является электронной почтой;
    /// Пароль для ресурса с таким названием уже создан;
    /// Пароль слишком короткий;
    /// </response>
    [HttpPost]
    [ProducesResponseType(typeof(PasswordResponse), 201)]
    public async Task<IActionResult> CreatePassword([Required] CreatePasswordRequest request)
    {
        ErrorOr<Password> requestToPasswordResult = CreatePasswordFrom(request);

        if (requestToPasswordResult.IsError)
            return Problem(requestToPasswordResult.Errors);

        var password = requestToPasswordResult.Value;
        ErrorOr<Created> createPasswordResult = await passwordService.StorePassword(password);

        return createPasswordResult.Match(_ => CreatedAtGetPassword(password), Problem);
    }

    /// <summary>Получить данные о пароле</summary>
    /// <param name="passwordId">Id пароля, который нужно найти</param>
    /// <response code="200">Пароль успешно найден</response>
    /// <response code="404">Not Found</response>
    [HttpGet("{passwordId:guid}")]
    [ProducesResponseType(typeof(PasswordResponse), 200)]
    public async Task<IActionResult> GetPassword(Guid passwordId)
    {
        ErrorOr<Password> getPasswordResult = await passwordService.GetPassword(passwordId);

        return getPasswordResult.Match(password => Ok(password.Adapt<PasswordResponse>()), Problem);
    }
    
    /// <summary>Получить список всех паролей</summary>
    /// <response code="200">Список паролей</response>
    [HttpGet]
    [ProducesResponseType(typeof(List<PasswordResponse>), 200)]
    public async Task<IActionResult> GetPasswords()
    {
        var passwords = await passwordService.GetPasswords();
        
        return Ok(passwords.Adapt<List<PasswordResponse>>());
    }

    private static ErrorOr<Password> CreatePasswordFrom(CreatePasswordRequest request)
    {
        return Password.Create(request.Title, request.Secret, request.IsEmail);
    }
    
    private CreatedAtActionResult CreatedAtGetPassword(Password password)
    {
        return CreatedAtAction(
            actionName:  nameof(GetPassword),
            routeValues: new { passwordId = password.Id },
            value:       password.Adapt<PasswordResponse>());
    }
}