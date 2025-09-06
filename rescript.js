const input = document.getElementById("task-text");
const listBox = document.getElementById("task-items");
const addbtn = document.getElementById("CreateClick");
const taskAlert = document.getElementById("alert");
const delListbtn = document.getElementById("delete-btn");
const maxTasks = 10;

loadTasks();

function showAlert(message, time){
    taskAlert.innerText = message;
    setTimeout(() => {
        taskAlert.innerText = "";
    }, time);
}

function addTask(){

    const task = input.value.trim();

    if(task===""){
        showAlert("Please enter a task!", 3000);
        return;
    }

    if(listBox.children.length >= maxTasks){
        showAlert(`You can only have up to ${maxTasks} tasks!`, 2000);
        return;
    }

    createTaskElement(task);
    showAlert("Task successfully created!", 3000);
    input.value = "";
    saveTasks();


}

addbtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault();

        addTask();
    }

});

function createTaskElement(task){
    
    const listItem = document.createElement('li');
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.alignContent = "center";
    
    const tasktext = document.createElement("span");
    tasktext.textContent = task;
    listItem.appendChild(tasktext);

    const btnbox = document.createElement("div");

    const doneBtn = document.createElement("img");
    doneBtn.src = './images/check.png';
    doneBtn.style.marginLeft = "8px";
    
    const delbtn = document.createElement("img");
    delbtn.src = './images/delete.png';
    delbtn.style.marginLeft = "4px"

    btnbox.appendChild(doneBtn);
    btnbox.appendChild(delbtn);

    listItem.appendChild(btnbox);

    listBox.appendChild(listItem);

    doneBtn.addEventListener('click', function(){
        tasktext.style.textDecoration = "line-through";
        
        if(btnbox.contains(doneBtn)){
            btnbox.removeChild(doneBtn);
        }

        saveTasks();
        showAlert("Task completed! Good job!",2000);
        
        
    })

    delbtn.addEventListener('click', function(){
        listBox.removeChild(listItem);
        showAlert("Task removed successfully!", 2450);
        saveTasks();
    });
}

function saveTasks(){
    
    let tasks = [];
    listBox.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.trim());
    });

    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){

    const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];

    tasks.forEach(createTaskElement);
}

function deleteList(){

    if(confirm("Are you sure you want to delete the whole list?")){
        sessionStorage.removeItem("tasks");
    }

    listBox.innerHTML = "";

    showAlert("Entire list has been eradicated (kaboom)!", 2000);
}

delListbtn.addEventListener('click', deleteList);