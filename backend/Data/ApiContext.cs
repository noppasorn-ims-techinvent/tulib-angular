using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApiContext : IdentityDbContext<User>
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {

        }

        //List of tables here
        public DbSet<Tag> Tags { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<test>()
            //     .HasOne(a => a.CreatedBy)
            //     .WithMany()
            //     .OnDelete(DeleteBehavior.NoAction);
            // modelBuilder.Entity<test>()
            //     .HasOne(a => a.ModifiedBy)
            //     .WithMany()
            //     .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Tag>()
                .HasOne(t => t.CreatedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Tag>()
                .HasOne(t => t.ModifiedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}