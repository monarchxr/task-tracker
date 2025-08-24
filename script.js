const addbtn = document.getElementById('input-button'); //add button
const task_name = document.getElementById("task-add"); //input thingy
const task_container = document.getElementById("task-box"); //task container list

addbtn.addEventListener('click', ()=>{
    
    //first lets create a list item
    const tasklist = document.createElement("li");
    
    //now put the value of the input
    tasklist.innerText = task_name.value;
    // tasklist.classList.add('tasklist'); dont know what this does yet, im not gonna use it

    //append the list item to the task container list
    task_container.append(tasklist);
    //ok so its adding the items to the list but the input box isnt cleared

    task_name.value = "";
    //now its cleared after entry
    //addition is working yippee

})