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

function displayTaskList(value,index){

const formatDate = new Intl.DateTimeFormat("en-GB",{
  month: "short",
  day: "2-digit",
}).format(new Date(value.deadline));


const completedClass = value.status === 'completed' ? 'completed' :'';


 return `
<div class="list-item ${value.status} ${value.id}">
    <input type="checkbox" name="selectItem" id="selectItem${index}" class="selectItems" onchange="changeTaskStatus(${index})" ${value.status === 'completed' ? 'checked' : ''}>
    <div class="taskDeadLine">
            <div class="month">${formatDate.split(" ")[1]}</div>
            <div class="date">${formatDate.split(" ")[0]}</div>
    </div>
    <label for="selectItems" class="listDetails"> 
        <h4 class="todoName ${completedClass}">${value.todoName}</h4>
        <p class="todoType">${value.type}</p>
        <div class="tag-div">
            <span class="todoTag high">${value.tag}</span>
        </div>
    </label>
    <i class="ri-delete-bin-line" onclick="deleteTask(${value.id})"></i>
</div>
`
}

// Add new Todo List

function addNewListBtn() {

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
    
  const listITems = {

      todoName: inputValue,
      type: selectedValue,
      tag: selectedTag,
      deadline: selectedDate,
      status: "pending",
    };

  taskList.unshift(listITems);

  renderTask();

  taskInput.value = "";
  taskType.value = "Home";
  highTags.value = false;
  lowTags.value = false;
  deadline.value = "";
});
}


// creating array to dynamically insert the values

let taskList = [];

taskList.push({
id:1,
todoName: "Do yoga",
type: "Home",
tag: "High",
deadline:'2023-11-23',
status:"completed", 
});

taskList.push({
id:2,
todoName: "Do Dishes",
type: "Home",
tag: "Low",
deadline:'2023-11-28',
status:"pending", 
});

taskList.push({
id:3,
todoName: "Meeting at 1PM",
type: "Work",
tag: "High",
deadline:'2023-11-08',
status:"completed", 
});


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
        return list.status !== 'completed' ;
    });

    const completeTask = taskList.filter(list => list.status === 'completed');

    pendingTask.forEach((list,index) => {
      newString += displayTaskList(list,index);

    });

    completeTask.forEach((list,index) => {
      newString += displayTaskList(list,index);

    });

    tasks.innerHTML = newString;

    const deleteIcons = document.querySelectorAll('.ri-delete-bin-line');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const taskId = icon.parentElement.id.split('_')[1];
    
            if (taskId) {
                deleteTask(taskId);
            }
        });
    });

}

// toggle task status 

function changeTaskStatus(index) {
  const checkbox = document.getElementById(`selectItem${index}`);
  const status = checkbox.checked ? 'completed' : 'pending';
  taskList[index].status = status;
  renderTask();
}

renderTask();


// Delete TodoList  
function deleteTask(id) {
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
     taskList.splice(index, 1);
     renderTask();
  }
}

// close Add list container

function closeAddListContainer() {
  document.querySelector(".add-list-container").style.display = "none";
}

// Display radio buttons to select Tag Name 

function selectTagLine(){
   tagLines = document.querySelector(".tag-input .tagItems");
   tagLines.style.display = "flex";
   tagLines.style.marginTop = "20px";
   tagLines.style.gap = "10px"
}




