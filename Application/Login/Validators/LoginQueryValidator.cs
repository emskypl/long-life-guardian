using FluentValidation;

namespace Application.Login.Queries;

public class LoginQueryValidator : AbstractValidator<Login.Query>
{
    public LoginQueryValidator()
    {
        RuleFor(x => x.Login)
            .NotEmpty().WithMessage("Login is required");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required");
    }
}
