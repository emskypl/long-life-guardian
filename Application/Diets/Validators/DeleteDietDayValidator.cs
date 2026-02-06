using Application.Diets.Commands;
using FluentValidation;

namespace Application.Diets.Validators;

public class DeleteDietDayValidator : AbstractValidator<DeleteDietDay.Command>
{
    public DeleteDietDayValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("DietDay Id is required");
    }
}
