using AutoMapper;
using backend.Models;
using backend.Models.DTO;
using backend.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly ITaskRepository _taskRepository;

        public TaskController(IMapper mapper, ITaskRepository taskRepository)
        {
            _mapper = mapper;
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTasks = await _taskRepository.GetListTasks();

                var listTasksDto = _mapper.Map<IEnumerable<TaskDTO>>(listTasks);

                return Ok(listTasksDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var task = await _taskRepository.GetTask(id);

                if (task == null)
                {
                    return NotFound();
                }

                var taskDto = _mapper.Map<TaskDTO>(task);

                return Ok(taskDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var task = await _taskRepository.GetTask(id);

                if (task == null)
                {
                    return NotFound();
                }

                await _taskRepository.DeleteTask(task);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(TaskDTO taskDto)
        {
            try
            {
                var task = _mapper.Map<TaskApp>(taskDto);

                task.CreationDate = DateTime.Now;

                task = await _taskRepository.AddTask(task);

                var taskItemDto = _mapper.Map<TaskDTO>(task);

                return CreatedAtAction("Get", new { id = taskItemDto.Id }, taskItemDto);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TaskDTO taskDto)
        {
            try
            {
                var task = _mapper.Map<TaskApp>(taskDto);

                if (id != task.Id)
                {
                    return BadRequest();
                }

                var taskItem = await _taskRepository.GetTask(id);

                if (taskItem == null)
                {
                    return NotFound();
                }

                await _taskRepository.UpdateTask(task);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
