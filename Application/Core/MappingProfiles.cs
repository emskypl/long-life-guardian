using System;
using AutoMapper;
using Domain.Diets;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<DietDay, DietDay>();
    }

}
