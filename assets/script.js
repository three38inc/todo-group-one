function addNewList() {
  var addListContainer = document.querySelector(".add-list-container");
  addListContainer.style.display = "block";
}

function closeAddListContainer() {
  document.querySelector(".add-list-container").style.display = "none";
}

var taskList = [];

taskList.push({
  todoName: "Do yoga",
  type: "Home",
  tag: "High",
  status:"Pending",
});
taskList.push({
  todoName: "Do dishes",
  type: "Home",
  tag: "High",
  status:"Pending",
});

const tasks = document.getElementById("taskList");

function newTask() {
  let newString = "";

  taskList.forEach((list,index) => {

    newString += `
        <div class="list-item">
            <input type="checkbox" name="selectItem" id="selectItem${index}" class="selectItem" onchange = updateTaskStatus(this)>
            <label for="selectItem" class="listDetails">
                <h4 class="todoName ${list.status === 'Completed' ? 'completed' : ''}">${list.todoName}</h4>
                <p class="todoType">${list.type}</p>
                <div class="tag-div">
                    <span class="todoTag high">${list.tag}</span>
                </div>
            </label>
        <button>${list.status}</button>
        </div>
    `;
  });
  tasks.innerHTML = newString;

  
}

newTask();

// Add Task Functionality

var addTask = document.getElementById("addBtn");

addTask.addEventListener("click", function () {
  const taskInput = document.getElementById("inputText");
  const taskType = document.getElementById("projectList");
  // const dateInput = document.getElementById("deadline");

  var selectedOption = taskType.options[taskType.selectedIndex];

  console.log(selectedOption);
  var selectedValue = selectedOption.value;
  var inputValue = taskInput.value;
  // var selectedDate = dateInput.value;

  if (inputValue === "") {
    alert("Please enter a valid task");
  }

  taskList.push({
    todoName: inputValue,
    type: selectedValue,
    tag: "Low",
    status: "Not Started",
  });

  newTask();

  taskInput.value = "";
  taskType.value = "Home";

  // displaySelectedDate(selectedDate);

  dateInput.value = "";
});

function updateTaskStatus(checkbox) {
  const index = parseInt(checkbox.id.slice(-1), 10);
  
  const todoName = document.querySelector(`#selectItem${index} + label .todoName`);

  if (checkbox.checked) {
    taskList[index].status = 'Completed';
    todoName.classList.add('completed');
  } else {
    taskList[index].status = 'Pending';
    todoName.classList.remove('completed');
  }
  newTask();
}

let today = new Date();
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dateFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);
  document.getElementById("dateValue").innerHTML = dateFormat.format(today);
