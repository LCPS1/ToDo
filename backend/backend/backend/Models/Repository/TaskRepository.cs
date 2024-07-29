
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AplicationDbContext _context;

        public TaskRepository(AplicationDbContext context)
        {
            _context = context;         

        }
        public async Task<TaskApp> AddTask(TaskApp task)
        {
            _context.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task DeleteTask(TaskApp task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TaskApp>> GetListTasks()
        {
            return await _context.Tasks.ToListAsync();

        }

        public async Task<TaskApp> GetTask(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task UpdateTask(TaskApp task)
        {
            var taskItem = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == task.Id);

            if (taskItem != null)
            {
                taskItem.Title = task.Title;
                taskItem.Description = task.Description;
                taskItem.DueDate = task.DueDate;
                taskItem.IsCompleted = task.IsCompleted;
                taskItem.CreationDate = task.CreationDate;

                await _context.SaveChangesAsync();
            }

        }
    }
}
