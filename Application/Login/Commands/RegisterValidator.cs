using FluentValidation;

namespace Application.Login.Commands;

public class RegisterValidator : AbstractValidator<Register.Command>
{
    public RegisterValidator()
    {
        RuleFor(x => x.Login)
            .NotEmpty().WithMessage("Login is required")
            .MinimumLength(3).WithMessage("Login must be at least 3 characters")
            .MaximumLength(50).WithMessage("Login must not exceed 50 characters");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters")
            .MaximumLength(100).WithMessage("Password must not exceed 100 characters");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format")
            .MaximumLength(100).WithMessage("Email must not exceed 100 characters");

        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required")
            .MinimumLength(2).WithMessage("Username must be at least 2 characters")
            .MaximumLength(50).WithMessage("Username must not exceed 50 characters");
    }
}
