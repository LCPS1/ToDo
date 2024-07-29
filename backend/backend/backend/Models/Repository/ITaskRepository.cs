namespace backend.Models.Repository
{
    public interface ITaskRepository
    {
        Task<List<TaskApp>> GetListTasks();
        Task<TaskApp> GetTask(int id);
        Task DeleteTask(TaskApp task);
        Task<TaskApp> AddTask(TaskApp task);
        Task UpdateTask(TaskApp task);
    }
}
