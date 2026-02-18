using System;

namespace Domain;

public class UserFollowing
{
    public string ObserverId { get; set; }
    public User Observer { get; set; }

    public required string TargetId { get; set; }

    public User Target { get; set; } = null;
}
