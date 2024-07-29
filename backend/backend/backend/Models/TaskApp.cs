using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class TaskApp
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

    }
}
