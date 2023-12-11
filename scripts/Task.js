class Task {
    constructor({todoName,type,tag,deadline}){

        this.id = new Date().getTime();
        this.todoName = todoName;
        this.type = type;
        this.tag = tag;
        this.deadline = deadline;
        this.status = 'pending';
    }
    // methods

   
   toggleStatus(checked){
        this.status = checked ? 'completed' : 'pending';
   }
   
   removeTask(taskList, taskId) {
    const index = taskList.findIndex((task) => task.id.toString() === taskId);
    if (index !== -1) {
      taskList.splice(index, 1);
    } else {
      console.log("Task not found for ", taskId);
    }
  }      
}
