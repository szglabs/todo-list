import * as storage from './storage';
import * as view from './view';
import { newID } from './projects';

const taskFactory = (title, description, project, dueDate, priority, projectID) => {
  const taskID = newID();
  return { title, description, project, dueDate, priority, taskID, projectID };
};

const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));

// saves add task modal submit for new task, logic for submit btn event listener
const saveNewTask = () => {
  // dom elements
  const taskTitle = document.getElementById('taskTitle');
  const taskDescription = document.getElementById('taskDescription');
  const taskProject = document.getElementById('taskProject');
  const taskDueDate = document.getElementById('taskDueDate');
  const taskPriority = document.getElementById('taskPriority');
  const taskForm = document.getElementById('taskForm');

  //   submit logic
  taskForm.classList.add('was-validated');
  if (taskTitle.checkValidity() && taskProject.checkValidity() && taskDueDate.checkValidity() && taskPriority.checkValidity()) {
    storage.taskStorage.push(
      taskFactory(
        taskTitle.value,
        taskDescription.value,
        taskProject.value,
        taskDueDate.value,
        taskPriority.value,
        retrieveProjectID(taskProject.value)
      )
    );
    addTaskModal.toggle();
    view.updateTaskList();
    console.log(storage.taskStorage);

    // clean modal after submit
    taskForm.classList.remove('was-validated');
    taskTitle.value = null;
    taskDescription.value = null;
    taskProject.value = null;
    taskDueDate.value = null;
    taskPriority.value = null;
  }
};

// event listner on save new task modal
const saveTaskBtn = document.querySelector('.saveTaskBtn');
saveTaskBtn.addEventListener('click', saveNewTask);

// Delete task from taskStorage and view
const deleteTask = (selectedTaskID) => {
  let targetTaskIndex = storage.taskStorage.findIndex((task) => task.taskID === selectedTaskID);
  storage.taskStorage.splice(targetTaskIndex, 1);
  document.querySelector(`[data-task-ID=${selectedTaskID}]`).remove();
};

const editTaskValues = (selectedTask) => {
  document.getElementById('editTaskTitle').value = selectedTask.title;
  document.getElementById('editTaskDescription').value = selectedTask.description;
  document.getElementById('editTaskProject').value = selectedTask.project;
  document.getElementById('editTaskDueDate').value = selectedTask.dueDate;
  document.getElementById('editTaskPriority').value = selectedTask.priority;
};

// const saveEditTaskValues

export { taskFactory, deleteTask, editTaskValues };
