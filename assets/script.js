function addList() {
  document.querySelector(".add-list-container").style.display = "";
}

function CloseAddListContainer() {
  document.querySelector(".add-list-container").style.display = "none";
}

var taskList = [];

taskList.push({
  todoName: "Do yoga",
  type: "Home",
  tag: "High",
});

taskList.push({
  todoName: "Do Dishes",
  type: "Home",
  tag: "Low",
});

const tasks = document.getElementById("taskList");

function newTask() {
  let newString = "";

  taskList.forEach((list) => {
    newString += `

        <div class="list-item">
            <input type="checkbox" name="selectItem" id="selectItem1" class="selectItem">
            <label for="selectItem1" class="listDetails">
                <h4 class="todoName">${list.todoName}</h4>
                <p class="todoType">${list.type}</p>
                <div class="tag-div">
                    <span class="todoTag high">${list.tag}</span>
                </div>
            </label>
        </div>
    `;
  });
  tasks.innerHTML = newString
}

newTask()

// Add Task Functionality

var addTask = document.getElementById('addBtn')

addTask.addEventListener('click', function () {
   const taskInput = document.getElementById('inputText')
   const taskType = document.getElementById('projectList')
   
    var selectedOption = taskType.options[taskType.selectedIndex]

    var selectedValue = selectedOption.value
    var inputValue = taskInput.value
    
    if (inputValue === ""){
      alert ("Please enter a valid task")
    }

    taskList.push({
      todoName: inputValue,
      type: selectedValue,
      tag: "Low",
    });
    
    taskInput.value = ''
    taskType.value = 'Home'

    newTask();
})