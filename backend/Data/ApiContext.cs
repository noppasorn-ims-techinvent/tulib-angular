using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApiContext :IdentityDbContext<User>
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {

        }

        //List of tables here
  
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<User>()
            //     .HasOne(a => a.CreatedBy)
            //     .WithMany()
            //     .OnDelete(DeleteBehavior.NoAction);
            // modelBuilder.Entity<User>()
            //     .HasOne(a => a.ModifiedBy)
            //     .WithMany()
            //     .OnDelete(DeleteBehavior.NoAction);
        }
    }
}