
let taskList = localStorage.getItem('taskList');

if(!taskList){
  
   taskList = [];

   localStorage.setItem('tasks',JSON.stringify(taskList));
}else{
   taskList = JSON.parse(taskList);
}
// Display Today Date & Time

const dateFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

const timeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const dateFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);
const timeFormat = new Intl.DateTimeFormat("en-GB", timeFormatOptions);

setInterval(() =>{

let today = new Date();

document.getElementById("dateValue").innerHTML = dateFormat.format(today);
document.getElementById("timeValue").innerHTML = timeFormat.format(today);

}, 1000)

// Display all TaskLists 

function displayTaskList(value, index) {
  console.log(value)
  const formatDate = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "2-digit",
  }).format(new Date(value.deadline));

  let todayDate = new Date().getDate();
  let deadlineDate = new Date(value.deadline).getDate();

  let deadlineClass = ''
  if (value.status === 'completed') {
    deadlineClass = 'completedDate'
  } else {
    deadlineClass = deadlineDate <= todayDate ? 'deadlineDate' : 'month';
  }
  console.log('here', deadlineClass)
  const completedClass = value.status === 'completed' ? 'completed' : '';
  const tagClass = { 'High': 'high', 'Low': 'low', 'Medium': 'medium' };

  return `
    <div class="list-item ${value.status}" data-task-id="${value.id}">
        <input type="checkbox" name="selectItem" id="selectItem${index}" class="selectItems" ${value.status === 'completed' ? 'checked' : ''} >
        <div class="taskContent">
        <div class="taskDeadLine">
        <div class="monthBox ${deadlineClass}">${formatDate.split(" ")[1]}</div>
        <div class="date">${formatDate.split(" ")[0]}</div>
        </div>
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

    let inputValue = taskInput.value;
    let selectedOption = taskType.options[taskType.selectedIndex];
    let selectedValue = selectedOption.value;
    let selectedDate = deadline.value;

    const lowTags = document.getElementById('lowTag');
    const highTags = document.getElementById('highTag');

    let selectedTag ; 

    if(lowTags.checked){
      selectedTag = lowTags.value;
    }else if(highTags.checked){
      selectedTag = highTags.value;
    }else{
      selectedTag = "Low";
    }
      
    taskList.push({
        id: taskList.length+1,
        todoName: inputValue,
        type: selectedValue,
        tag: selectedTag,
        deadline: selectedDate,
        status: "pending",
    });

    saveTaskTolocalStorage();

    renderTask();

    taskInput.value = "";
    taskType.value = "Home";
    highTags.value = false;
    lowTags.value = false;
    deadline.value = "";

  });
}


// let taskList = savedTasks

// Filtering & sorting task based on status & date 

const tasks = document.getElementById("taskLists");

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
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', function() {
        const parentElement = checkbox.closest('.list-item');
        const taskId = parentElement.dataset.taskId;
      
        let task = taskList.find(t => t.id.toString() === taskId);
    
        if (task) {
            task.status = checkbox.checked ? 'completed' : 'pending';
           
        } else {
            console.log('Task not found for', taskId);
        }

        saveTaskTolocalStorage();
        renderTask(); 

    })
    );

    const addTask = document.getElementById('addNewListBtn')
    addTask.addEventListener('click', addNewList);


    const addTag = document.querySelectorAll('.add-icons');
    addTag.forEach(tagLine => tagLine.addEventListener('click',selectTagLine));

  
    const deleteIcons = document.querySelectorAll('.ri-delete-bin-line');
    deleteIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        const parentElement = icon.closest('.list-item');
        const taskId = parentElement.dataset.taskId;

       const index = taskList.findIndex((task) => task.id.toString() === taskId);
        if (index !== -1) {
            taskList.splice(index, 1);
          
        }else {
          console.log("Task not found for ", taskId);
        }
        
        saveTaskTolocalStorage();
        
        renderTask();

    })
  });


    const closeIcon = document.getElementById('closeIcon');
    closeIcon.addEventListener('click',closeAddListContainer);
       
}

function saveTaskTolocalStorage(){
  localStorage.setItem('taskList',JSON.stringify(taskList));
}


renderTask();


// close Add list container when icon is clicked

function closeAddListContainer() {
  document.querySelector(".add-list-container").style.display = "none";
}

// Display radio buttons to select Tag Name 

function selectTagLine(){

  const tags = document.querySelector(".tag-input .tagItems")

  tags.style.display = "flex";
  tags.style.marginTop = "20px";
  tags.style.gap = "10px";
}