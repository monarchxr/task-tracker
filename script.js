const taskValue = document.getElementById("task-text");
const taskItems = document.getElementById("task-items");
const add = document.getElementById("CreateClick");
const addUpdate = document.getElementById("CreateClick");
const taskAlert = document.getElementById("alert");
const maxTasks = 15;

let todo = JSON.parse(localStorage.getItem("todo-list"));
if(!todo){
    todo = [];
}

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

let updateText = null;
let updateIndex = null;
let isUpdating = false;

//alert function
// given a message parameter
// show the message 
// for a certain amt of time, i.e settimeout

function showAlert(message, time){
    taskAlert.innerText = message;
    setTimeout(() => {
        taskAlert.innerText = "";
    }, time);
}

function readLocalStorage(){
    taskItems.innerHTML = "";
    todo.forEach((element)=>{
        if(element.item.trim()!== ""){
            let li = document.createElement("li");
            const todoItems = `<div title="Hit Double Click and Complete" ondblclick="Completed(this)">${element.item}</div><div>
                    <img class="edit todo-controls" onclick="Update(this)" src="/images/edit.png" />
                    <img class="delete todo-controls" onclick="Delete(this)" src="/images/delete.png" /></div></div>`;
            li.innerHTML = todoItems;
            taskItems.appendChild(li);  
        }
        
    });
}

//create task

//1. check if user entered task, if not alert -> enter task
//2. check if user entered task already exists in list, if yes alert -> task already exists

//3. task entered -> add to list and localstorage
//4. after task added, alert -> task added successfully

//5. list item has 2 options -> edit and delete

function Create(){
  
    if(todo.length >= maxTasks){
        showAlert("You can only have up to ${maxTasks} tasks!", 3000);
        return;
    }
    

    if(taskValue.value === "") {
        showAlert("Please enter a task!", 3000);
        taskValue.focus();
        return;
    }

    let IsPresent = false;
    todo.forEach((element) => {
        if (element.item == taskValue.value) {
            IsPresent = true;
        }
    });

    if(IsPresent){
        showAlert("Task already exists, please enter another task!", 3000);
        return;
    }

    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="Completed(this)">${taskValue.value}</div><div>
                <img class="edit todo-controls" onclick="Update(this)" src="/images/edit.png" />
                <img class="delete todo-controls" onclick="Delete(this)" src="/images/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    taskItems.appendChild(li);
        
    let itemList = { item: taskValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
    
    taskValue.value = "";
    showAlert("Todo item Created Successfully!", 1850);
}

add.addEventListener('click', ()=>{
    if(isUpdating){
        UpdateOnSelection();
    }else{
        Create();
    }
});

taskValue.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault();

        if(isUpdating){
        UpdateOnSelection();
        }else{
            Create();
        }
    }
});
// readLocalStorage();

function Read(){
    todo.forEach((element, idx) => {
        let li = document.createElement("li");
        let style = "";
        let checkimg = "";
        let editbtn = `<img class="edit todo-controls" onclick="Update(this) src="/images/edit.png" />`; 
        
        if(element.status){
            style = "style='text-decoration: line-through'";
            checkimg = `img class="todo-controls" src="/images/check.png" />`;
            editbtn = "";
        }
    const todoItems = `
                <div style="${style}" title="Hit Double Click and Complete" ondblclick="Completed(this)">
                    ${element.item} ${checkimg}
                </div>
                <div>
                    ${editbtn}
                    <img class="delete todo-controls" onclick="Delete(this)" src="/images/delete.png" />
                </div>
            `;

            li.innerHTML = todoItems;
            taskItems.appendChild(li);
  });
}
// Read();

function Update(e){
    const div = e.parentElement.parentElement.querySelector("div");
    
    if(div.style.textDecoration ===""){
            taskValue.value = div.innerText.trim();
            updateText = div;
            updateIndex = [...taskItems.children].indexOf(e.closest("li"));
            isUpdating = true;

            add.setAttribute("src", "/images/refresh.png");
            taskValue.focus();
    }
}

function UpdateOnSelection(){
    
    const newTask = taskValue.value.trim();

    if(newTask === ""){
        showAlert("Task cannot be empty!", 1850);
        return;
    }
    
    const IsPresent = todo.some(
        (element, idx) => element.item === newTask && idx !== updateIndex
    );

    if(IsPresent){
        showAlert("Task already exists!", 1850);
        return;
    }

    todo[updateIndex].item = newTask;
    setLocalStorage();

    updateText.innerText = newTask;
    
    taskValue.value = "";
    updateText = null;
    updateIndex = null;
    isUpdating = false;

    add.setAttribute("src", "/images/add.png");
    showAlert("Task updated successfully!");
}

function Delete(e){
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText.trim();

    if(confirm(`Are you sure you want to delete "${deleteValue}"?`)){
        e.parentElement.parentElement.classList.add("delete-item");
        taskValue.focus();

        const index = todo.findIndex((element)=>element.item === deleteValue);

        if(index!==-1){
            todo.splice(index,1);
        }

        setTimeout(()=>{
            e.parentElement.parentElement.remove();
        }, 500);

        setLocalStorage();

        // Read();
    }
}

function Completed(e){

    const div = e.parentElement.querySelector("div");

    if(div.style.textDecoration === ""){

        div.style.textDecoration = "line-through";

        const img = document.createElement("img");
        img.src = "/images/check.png";
        img.className = "todo-controls";
        div.appendChild(img);

        const editbtn = e.parentElement.querySelector("img.edit");
        if(editbtn) editbtn.remove();

        const taskText = div.innerText.trim();
        const index = todo.findIndex(item=> item.item===taskText);

        if(index!==-1){
            todo[index].status = true;
        }

        setLocalStorage();

        showAlert("Task completed! Yay!", 3000);
        // Read();
    }
}