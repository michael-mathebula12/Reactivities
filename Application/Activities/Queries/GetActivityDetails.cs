using System;
using System.Diagnostics;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Domain.Activity>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Domain.Activity>>
    {
        public async Task<Result<Domain.Activity>> Handle(Query request, CancellationToken cancellationToken)
        {

            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null)
            {
                return Result<Domain.Activity>.Failure("Activity not found", 404);
            }

            return Result<Domain.Activity>.Success(activity);

        }
    }

}
