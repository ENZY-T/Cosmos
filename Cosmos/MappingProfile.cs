using System;
using AutoMapper;
using Cosmos.Dtos;
using Cosmos.Models;

namespace Cosmos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AdminItemDto, ProjectDbModel>()
                .ForMember(pdm =>
                    pdm.CreatedDate, opt =>
                    opt.MapFrom(src => DateTime.Today));
            
            CreateMap<AdminItemDto, ArticleDbModel>()
                .ForMember(adm =>
                    adm.CreatedDate, opt =>
                    opt.MapFrom(src => DateTime.Today));

            CreateMap<ReviewDbModel, ReviewDto>();
            CreateMap<ReviewDto, ReviewDbModel>();
        }
    }
}