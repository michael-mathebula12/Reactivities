using System;
using System.Diagnostics;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Activities.DTOs;
using Application.Interfaces;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<ActivityDto>> { }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ActivityDto>>
    {
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
            .ProjectTo<ActivityDto>(mapper.ConfigurationProvider
            , new {currentUserId = userAccessor.GetUserId()})
            .ToListAsync(cancellationToken);
        }
    }
}
