using AutoMapper;
using backend.Models.DTO;
namespace backend.Models.Profiles
{
    public class TaskProfile :Profile
    {
        public TaskProfile()
        {
            CreateMap<TaskApp, TaskDTO>();
            CreateMap<TaskDTO, TaskApp>();
        }
    }
}
