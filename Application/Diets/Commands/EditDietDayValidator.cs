using FluentValidation;

namespace Application.Diets.Commands;

public class EditDietDayValidator : AbstractValidator<EditDietDay.Command>
{
    public EditDietDayValidator()
    {
        RuleFor(x => x.DietDay)
            .NotNull().WithMessage("DietDay is required");

        RuleFor(x => x.DietDay.Id)
            .NotEmpty().WithMessage("DietDay ID is required")
            .When(x => x.DietDay != null);

        RuleFor(x => x.DietDay.Date)
            .NotEmpty().WithMessage("Date is required")
            .When(x => x.DietDay != null);

        RuleFor(x => x.DietDay.ProteinTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Protein target must be non-negative")
            .When(x => x.DietDay != null);

        RuleFor(x => x.DietDay.CarbsTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Carbs target must be non-negative")
            .When(x => x.DietDay != null);

        RuleFor(x => x.DietDay.FatTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Fat target must be non-negative")
            .When(x => x.DietDay != null);

        RuleFor(x => x.DietDay.CaloriesTarget)
            .GreaterThan(0).WithMessage("Calories target must be greater than 0")
            .When(x => x.DietDay != null);
    }
}
