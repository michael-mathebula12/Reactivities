using System;
using Application.Profiles.DTOs;
using FluentValidation;

namespace Application.Profiles.Validators;

public class EditProfileValidator : AbstractValidator<EditProfileDto>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.DisplayName).NotEmpty().WithMessage("Display name is required, please fill in");
    }
}
