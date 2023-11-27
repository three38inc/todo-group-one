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
  

// Display Todo List 

function addNewList() {
    var addListContainer = document.querySelector(".add-list-container");
    addListContainer.style.display = "block";


    var addTask = document.getElementById("addBtn");

    addTask.addEventListener("click", function () {
    const taskInput = document.getElementById("inputText");
    const taskType = document.getElementById("projectList");

    var selectedOption = taskType.options[taskType.selectedIndex];

   
    var selectedValue = selectedOption.value;
    var inputValue = taskInput.value;
    

    const lowTags = document.getElementById('lowTag');
    const highTags = document.getElementById('highTag');

    var selectedTag;

    if(lowTags.checked){
       selectedTag = lowTags.value;
    }else if(highTags.checked){
      selectedTag = highTags.value;
    }else{
      selectedTag = "Low";
    }
      
      
    if (inputValue === "") {
      alert("Please enter a valid task");
    }

    const listITems = {
        todoName: inputValue,
        type: selectedValue,
        tag: "Low",
        status: "Not Started",
      };

    taskList.unshift(listITems);

    renderTask();

    taskInput.value = "";
    taskType.value = "Home";
    dateInput.value = "";
});
}


// Array creation to dynamic insertion of values
var taskList = [];

taskList.push({
  todoName: "Do yoga",
  type: "Home",
  tag: "High",
  status:"Pending",
});


const tasks = document.getElementById("taskList");

  let newString = "";

  taskList.forEach((list,index) => {

    newString += `
        <div class="list-item">
            <input type="checkbox" name="selectItem" id="selectItem${index}" class="selectItem" >
            <label for="selectItem" class="listDetails">
                <h4 class="todoName ">${list.todoName}</h4>
                <p class="todoType">${list.type}</p>
                <div class="tag-div">
                    <span class="todoTag high">${list.tag}</span>
                </div>
            </label>
            <i class="ri-delete-bin-6-fill" onclick = "deleteTask(${index})"></i>
        </div>
    `;
  });
  tasks.innerHTML = newString;

}

renderTask();

// Delete TodoList  

function deleteTask(index){
       taskList.splice(index,1);
       renderTask();
}

// close Add list container

function closeAddListContainer() {
  document.querySelector(".add-list-container").style.display = "none";
}

function selectTagLine(){
     tagLines = document.querySelector(".tag-input .tagItems");
   
     tagLines.classList.toggle('hidden');
}
