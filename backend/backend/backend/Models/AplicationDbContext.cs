using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<TaskApp> Tasks { get; set; }


    }
}
