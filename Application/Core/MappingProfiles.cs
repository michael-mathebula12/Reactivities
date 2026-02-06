using System;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        //map 1 activity to another activity
        CreateMap<Activity, Activity>();
    }
}
