using FluentValidation;

namespace Application.Login.Queries;

public class LoginValidator : AbstractValidator<Login.Query>
{
    public LoginValidator()
    {
        RuleFor(x => x.Login)
            .NotEmpty().WithMessage("Login is required");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required");
    }
}
