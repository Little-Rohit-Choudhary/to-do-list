document.addEventListener('DOMContentLoaded',()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task));
        updateTasksList();
        updateStats();
    }
});
let tasks = [];
const saveTasks = ()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
const addTask = ()=>{
    const taskInput = document.getElementById('taskInput');
    const text  = taskInput.value.trim();
    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value = '';
        updateTasksList();
        updateStats();
        saveTasks();
    }
};
const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};
const deleteTask = (index) =>{
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};
const editTask = (index) =>{
    const taskInput = document.getElementById('taskInput');
    taskInput.value  = tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};
const updateStats = ()=>{
    const completeTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
    if(tasks.length && completeTasks==totalTasks){
        blastconfetti();
    }
    const img = document.querySelector('.todo-image');
    if(tasks.length>0){
        img.style.display='none';
    }
    else{
        img.style.display='inline-block';
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";
    tasks.forEach((task,index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem ${task.completed ? "completed" : ""}">
            <div class="task">
            <label>
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <span class="${task.completed ? "checked" : ""}">
                    <i class="fa fa-check"></i>
                    <p>${task.text}</p>
                </span>
            </label>
            </div>
            <div class="icons">
                <i id='edit' class="fa-solid fa-pen-to-square" onClick="editTask(${index})" style="${task.completed ? 'display: none' : 'display: inline-block'}"></i>
                <i id='delete' class="fa-solid fa-trash" onClick="deleteTask(${index})"></i>
            </div>
        </div>
        `;
        listItem.addEventListener('change',()=> toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};
document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();

    addTask();
});

const blastconfetti = ()=>{
    const duration = 5 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
};