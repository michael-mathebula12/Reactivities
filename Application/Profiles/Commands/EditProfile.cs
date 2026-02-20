using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        // public required string userId {get; set;} ="";
        public required EditProfileDto ProfileDto { get; set; }

    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {

            // var user = await context.Users.FindAsync([request.ProfileDto.userId], cancellationToken);
            var userId = userAccessor.GetUserId();

            var user = await context.Users.FindAsync([userId], cancellationToken);
            
            if (user == null) return Result<Unit>.Failure("User was not found", 404);

            mapper.Map(request.ProfileDto, user);
            //telling ef core that entity has been modified
            // even if its not.
            context.Entry(user).State = EntityState.Modified;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update user", 400);

            return Result<Unit>.Success(Unit.Value);
        }
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
