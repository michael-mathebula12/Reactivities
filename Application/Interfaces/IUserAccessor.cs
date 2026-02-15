using System;
using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    public string GetUserId();

    public Task<User> GetUserAsync();

    public Task<User> GetUserWithPhotosAsync();

}
