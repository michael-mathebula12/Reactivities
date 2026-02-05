using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    //dont want this to be null so require
    //creates a table called Activities
    public required DbSet<Activity> Activities { get; set; }
}
