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

        // List of tables here
        public DbSet<Tag> Tags { get; set; } = default!;
        public DbSet<ScheduleDate> ScheduleDates { get; set; } = default!;
        public DbSet<ScheduleTime> ScheduleTimes { get; set; } = default!;
        public DbSet<Promotion> Promotions { get; set; } = default!;
        public DbSet<StandardPrice> StandardPrices { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Tag entity relationships
            modelBuilder.Entity<Tag>()
                .HasOne(t => t.CreatedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Tag>()
                .HasOne(t => t.ModifiedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            // Configure ScheduleDate entity
            modelBuilder.Entity<ScheduleDate>()
                .HasKey(sd => sd.Id);

            modelBuilder.Entity<ScheduleDate>()
                .HasOne(sd => sd.CreatedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ScheduleDate>()
                .HasOne(sd => sd.ModifiedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            // Configure ScheduleTime entity
            modelBuilder.Entity<ScheduleTime>()
                .HasKey(st => st.Id);

            modelBuilder.Entity<ScheduleTime>()
                .HasOne(st => st.ScheduleDate)
                .WithMany(sd => sd.ScheduleTimes)
                .HasForeignKey(st => st.ScheduleDateId);

            modelBuilder.Entity<ScheduleTime>()
                .HasOne(st => st.CreatedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ScheduleTime>()
                .HasOne(st => st.ModifiedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            // Configure Promotion entity relationships
            modelBuilder.Entity<Promotion>()
                .HasOne(p => p.CreatedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Promotion>()
                .HasOne(p => p.ModifiedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            // Configure StandardPrice entity relationships
            modelBuilder.Entity<StandardPrice>()
                .HasOne(sp => sp.CreatedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<StandardPrice>()
                .HasOne(sp => sp.ModifiedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
