
let taskList = localStorage.getItem('taskList')

if (!taskList){

  taskList = [];

  localStorage.setItem('TaskList', JSON.stringify(taskList));

} else {
  taskList = JSON.parse(taskList);
  taskList= taskList.map(tObj => {
    return new Task(tObj);
  })
}

function  getTaskId(element){
      const parentElement = element.closest('.list-item');
      const taskId = parentElement.dataset.taskId;
      const taskInstance = taskList.find((t) => t.id.toString() === taskId);
      return { parentElement, taskId, taskInstance }
  }

 // Display all TaskLists 

function displayTaskList(value, index) {

  let deadlineDate = value.deadline ? new Date(value.deadline).getDate() : null;

  if (isNaN(deadlineDate)) {
      console.error('Invalid deadline date:', value.deadline);
      deadlineDate = null; 
  }
  

    let todayDate = new Date().getDate();
    
    let deadlineClass = '';
    if (value.status === 'completed') {
        deadlineClass = 'completedDate';
    } else if( deadlineDate && deadlineDate <= todayDate){
        deadlineClass =  'deadlineDate';
    }else{
        deadlineClass = 'month';
    }
    
    const completedClass = value.status === 'completed' ? 'completed' : '';
    const tagClass = { 'High': 'high', 'Low': 'low', 'Medium': 'medium' };
  
    const taskDeadLine = value.deadline ? `
    <div class="taskDeadLine">
      <div class="monthBox ${deadlineClass}">${new Intl.DateTimeFormat("en-GB", { month: "short" }).format(new Date(value.deadline))}</div>
      <div class="date">${new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(new Date(value.deadline))}</div>
    </div>` : '';
    
  return `
    <div class="list-item ${value.status}" data-task-id="${value.id}">
        <input type="checkbox" name="selectItem" id="selectItem${index}" class="selectItems" ${value.status === 'completed' ? 'checked' : ''} >
        <div class="taskContent">
         ${taskDeadLine}
        <label for="selectItems${index}" class="listDetails"> 
            <h4 class="todoName ${completedClass}">${value.todoName}</h4>
            <p class="todoType">${value.type}</p>
            <div class="tag-div">
                <span class="todoTag ${tagClass[value.tag]}">${value.tag}</span>
            </div>
        </label>
        </div>
        <i class="ri-delete-bin-line"></i>
    </div>
    `
}

function  getTaskId(element){
  const parentElement = element.closest('.list-item');
  const taskId = parentElement.dataset.taskId;
  const taskInstance = taskList.find((t) => t.id.toString() === taskId);
  return { parentElement, taskId, taskInstance }
}

// Add new Todo List

function addNewList() {
       
    let addListContainer = document.querySelector(".add-list-container");
    addListContainer.style.display = "block";

    let addTask = document.getElementById("addBtn");

    addTask.addEventListener("click", function () {
      const taskInput = document.getElementById("inputText");
      const taskType = document.getElementById("projectList");
      const deadline =  document.getElementById("deadline");
    
    if (!taskInput.value) {
      alert("Please enter a valid task");
      return;
    }   
    
    // if(!deadline.value){
    //   alert("Please enter deadline for the task");
    //   return;
    // }

    let inputValue = taskInput.value;
    let selectedOption = taskType.options[taskType.selectedIndex];
    let selectedValue = selectedOption.value;
    let selectedDate = deadline.value || null;

    const lowTags = document.getElementById('lowTag');
    const highTags = document.getElementById('highTag');
    const medTags = document.getElementById('medTag');

    let selectedTag ; 

    if(lowTags.checked){
      selectedTag = lowTags.value;
    }else if(highTags.checked){
      selectedTag = highTags.value;
    }else if(medTags.checked){
      selectedTag = medTags.value;
    }
    else{
      selectedTag = "Low";
    }
      
    const newTask = new Task({
        todoName:inputValue,
        type:selectedValue,
        tag:selectedTag,
        deadline:selectedDate
    });

    taskList.push(newTask);

    saveTaskToLocalStorage();

    renderTask();

    taskInput.value = "";
    taskType.value = "Home";
    deadline.value = "";
    
  });
}

// let taskList = savedTasks

// Filter & sort task based on status & date

 const tasks = document.getElementById('taskLists');
// 
function renderTask(){

    let newString = "";

    taskList.sort(function (a,b){
        const aDate = new Date(a.deadline);
        const bDate = new Date(b.deadline);
        return aDate - bDate ;
    });

    const pendingTask = taskList.filter(function(list){
        return list.status != 'completed' ;
    });

    const completeTask = taskList.filter(list => list.status === 'completed');

    pendingTask.forEach((list,index) => {
      newString += displayTaskList(list,index);

    });

    completeTask.forEach((list,index) => {
      newString += displayTaskList(list,index);

    });

    tasks.innerHTML = newString;

  
   // event listener for checkBox , delete icon , close icons

    const checkboxes = document.querySelectorAll('.selectItems');
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', () => {

      const { taskInstance } = getTaskId(checkbox);

      
      if (taskInstance) {
        taskInstance.toggleStatus(checkbox.checked);
        saveTaskToLocalStorage();
        renderTask();
      } else {
        console.log("Task not found for ", taskId);
      }

    })
    );

    const addTask = document.getElementById('addNewListBtn');
    addTask.addEventListener('click', addNewList);


    const deleteIcons = document.querySelectorAll('.ri-delete-bin-line');
    deleteIcons.forEach(icon => icon.addEventListener('click', () => {
      const {taskId , taskInstance } = getTaskId(icon);
    
      if (taskInstance) {
        taskInstance.removeTask(taskList, taskId);
        saveTaskToLocalStorage();
        renderTask();
      } else {
        console.log("Task not found for ", taskId);
      }
    }));


    const closeIcon = document.getElementById('closeIcon');
    closeIcon.addEventListener('click',closeAddListContainer);
       
}

function saveTaskToLocalStorage(){
     localStorage.setItem('taskList',JSON.stringify(taskList));
  }


renderTask();


// close Add list container when icon is clicked

function closeAddListContainer() {
     document.querySelector(".add-list-container").style.display = "none";
}



