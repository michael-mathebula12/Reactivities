using System;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        // public string Predicate { get; set; } = "future";
        public ActivityParams Params { get; set; }
        public required string UserId { get; set; }

    }
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
             // 1. GetHashCode users activities
            // 2. apply filter
            // 3.adjust query to dto
            // var query = context.ActivityAttendees
            // .Where(x => x.UserId == request.UserId)
            // .Select(x => x.Activity)
            // .AsQueryable();

            // switch (request.Predicate)
            // {
            //     case "future":
            //         query = query.Where(x => x.Date >= DateTime.UtcNow);
            //         break;
            //     case "past":
            //         query = query.Where(x => x.Date < DateTime.UtcNow);
            //         break;
            //     case "hosting":
            //         query = query.Where(x => x.Attendees.Any(a => a.UserId == request.UserId && a.IsHost));
            //         break;
            // }

            // var activities = await query
            // .OrderBy(x => x.Date)
            // .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider)
            // .ToListAsync(cancellationToken);
            // return Result<List<UserActivityDto>>.Success(activities);

            var query = context.ActivityAttendees
            .OrderBy(x => x.Activity.Date)
            .Where(x => x.UserId == request.UserId)
            .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "future" => query.Where(x => x.Activity.Date >= DateTime.UtcNow),
                    "past" => query.Where(x => x.Activity.Date < DateTime.UtcNow),
                    "hosting" => query.Where(x => x.IsHost),
                    _ => query
                };

            }
            var projectedActivities = await query
                .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider,
                 new { currentUser = userAccessor.GetUserId() })
                .ToListAsync(cancellationToken);

            return Result<List<UserActivityDto>>.Success(projectedActivities);
        }
    }
}
