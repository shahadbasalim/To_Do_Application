let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector(".tasks-content");
let tasksCount =document.querySelector(".tasks-count span");
let tasksCompleted =document.querySelector(".tasks-completed span");
let deleteAll =document.querySelector(".delete-all");
let finishAll =document.querySelector(".finish-all");


//focus on input field
window.onload = function () {
    theInput.focus();
}

//adding the task
theAddButton.onclick = function () {
    if (theInput.value === "") {
        swal({
            title: "Please write something to add to the list!",
            icon: "error",
            className: "sweet-alert",
        })
    } else {
        let noTaskMessage = document.querySelector(".no-tasks-message");
        //check if span with no tasks message is exist
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            noTaskMessage.remove();
        }

        let mainSpan = document.createElement("span");
        let deleteButton = document.createElement("span");

        let text = document.createTextNode(theInput.value) //add text to mainSpan
        let deleteText = document.createTextNode("Delete") //add text to deleteButton

        mainSpan.appendChild(text);
        mainSpan.className = "task-box";
        deleteButton.appendChild(deleteText);
        deleteButton.className = "delete";

        mainSpan.appendChild(deleteButton);

        taskContainer.appendChild(mainSpan);
        
        //empty the input filed after entering the task
        theInput.value = "";
        //focus again on input field
        theInput.focus();

        //calculate tasks
        calculateTasks();
    }
};

document.addEventListener('click', function (e) {
    //delete task
    if (e.target.className == "delete") {
        e.target.parentNode.remove();
        //check number of tasks inside container
        if (taskContainer.childElementCount == 0) {
            createNoTasks();
        }
    }    
    //finish task
    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finished");
    }
    calculateTasks();
});

deleteAll.onclick = function () {
    let tasks = document.querySelectorAll(".task-box");
    for (let task of tasks) {
        task.remove();
    }
    createNoTasks();
};
finishAll.onclick = function () {
    let tasks = document.querySelectorAll(".task-box");
    tasks.forEach(task => {
        task.classList.add("finished");
    });
};

//function to create no tasks message
function createNoTasks() {
    let msgSpan = document.createElement("span");
    let msgText = document.createTextNode("No tasks to show");
    msgSpan.appendChild(msgText);
    msgSpan.className = 'no-tasks-message';
    taskContainer.appendChild(msgSpan);
};

// //function to calculate tasks
function calculateTasks() {
    //calculate all tasks
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
    //calculate completed tasks
    tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
}