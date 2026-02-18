using System;
using Application.Activities.DTOs;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        string? currentUserId = null;
        //map 1 activity to another activity
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, ActivityDto>()
        .ForMember(d => d.HostDisplayName, o => o
        .MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
        .ForMember(d => d.HostId, o => o
        .MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
        .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
        .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
        .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
        .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
        .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
         .ForMember(d => d.Following, o => o.MapFrom(s =>
        s.User.Followers.Any(x => x.Observer.Id == currentUserId)));


        CreateMap<User, UserProfile>()
        //d represents the destination and s represents the source
        .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
        .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))

        //we passing current user id to the mapper. to check if there are any observer ids in the followers list
        .ForMember(d => d.Following, o => o.MapFrom(s =>
        s.Followers.Any(x => x.Observer.Id == currentUserId)));

        //for updating user bio consider mapping the class to a DTO.
    //handler is a command or query
        CreateMap<Comment, CommentDto>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
        .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
        .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
    }
}
