using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Domain.Activity>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Domain.Activity>
    {
        public async Task<Domain.Activity> Handle(Query request, CancellationToken cancellationToken)
        {

            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null)
            {
                throw new Exception("Activity Not Found");
            }

            return activity;

        }
    }

}
