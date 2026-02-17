using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditProfileDto ProfileDto { get; set; }

    }
    // public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    // {
    //     public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
    //     {
    //         //    var userDisplayName = await context.Users.FindAsync([request.DisplayName], cancellationToken);
    //        var user = await userAccessor.GetUserAsync();

    //         // if (userId == null) return Result<Unit>.Failure("User not found", 404);

    //         // //pass in user info or user id?
    //         // mapper.Map(request.ProfileDto, userId);

    //         // var result = await context.SaveChangesAsync(cancellationToken) > 0;

    //         // if (!result) return Result<Unit>.Failure("Failed to update the user profile information", 400);

    //         // return Result<Unit>.Success(Unit.Value);

    //     }
    // }

}
