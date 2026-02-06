using System;
using System.Diagnostics;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Domain.Activity>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Domain.Activity>>
    {
        public async Task<List<Domain.Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}
