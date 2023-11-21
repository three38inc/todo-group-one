
function addList(){
   document.querySelector(".add-list-container").style.display = "";
}

function CloseAddListContainer() {
  document.querySelector(".add-list-container").style.display = "none";
}

var taskList = []

taskList.push({
  todoName:"Do yoga",
  type:"Home",
  tag : "High"
})

