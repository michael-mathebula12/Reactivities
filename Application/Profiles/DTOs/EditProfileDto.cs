using System;

namespace Application.Profiles.DTOs;

public class EditProfileDto
{

    //userId is set to "" to avoid null reference
    //exception when we map dto to user entity in the handler
    public required string DisplayName {get; set;}
    public string? Bio {get; set;}

}
