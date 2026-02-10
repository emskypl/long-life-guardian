using FluentValidation;

namespace Application.Diets.Commands;

public class EditDietDayCommandValidator : AbstractValidator<EditDietDay.Command>
{
    public EditDietDayCommandValidator()
    {
        RuleFor(x => x.DietDay)
            .NotNull().WithMessage("DietDay is required");

        RuleFor(x => x.DietDay.Id)
            .NotEmpty().WithMessage("DietDay Id is required");

        RuleFor(x => x.DietDay.Date)
            .NotEmpty().WithMessage("Date is required");

        RuleFor(x => x.DietDay.ProteinTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Protein target must be non-negative");

        RuleFor(x => x.DietDay.CarbsTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Carbs target must be non-negative");

        RuleFor(x => x.DietDay.FatTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Fat target must be non-negative");

        RuleFor(x => x.DietDay.CaloriesTarget)
            .GreaterThanOrEqualTo(0).WithMessage("Calories target must be non-negative");
    }
}
