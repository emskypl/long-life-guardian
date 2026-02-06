using Application.Diets.Commands;
using FluentValidation;

namespace Application.Diets.Validators;

public class CreateDietDayValidator : AbstractValidator<CreateDietDay.Command>
{
    public CreateDietDayValidator()
    {
        RuleFor(x => x.DietDay)
            .NotNull()
            .WithMessage("DietDay is required");

        RuleFor(x => x.DietDay.Date)
            .NotEmpty()
            .WithMessage("Date is required");

        RuleFor(x => x.DietDay.CaloriesTarget)
            .GreaterThan(0)
            .WithMessage("Calories target must be greater than 0")
            .LessThanOrEqualTo(10000)
            .WithMessage("Calories target seems unrealistic");

        RuleFor(x => x.DietDay.ProteinTarget)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Protein target cannot be negative");

        RuleFor(x => x.DietDay.CarbsTarget)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Carbs target cannot be negative");

        RuleFor(x => x.DietDay.FatTarget)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Fat target cannot be negative");
    }
}
