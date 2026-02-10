using AutoMapper;
using Application.Diets.DTOs;
using Domain.Diets;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // DietDay mappings
        CreateMap<DietDay, DietDayDto>();
        CreateMap<CreateDietDayDto, DietDay>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore());
        
        // Meal mappings
        CreateMap<Meal, MealDto>();
        CreateMap<MealDto, Meal>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        
        // Product mappings
        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
    }
}
