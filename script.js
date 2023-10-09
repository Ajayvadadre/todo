let inputTask = document.getElementById("inputTask")
let btnAdd = document.getElementById("btnAdd")
let taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const displayTask = () => {
    taskList.innerHTML = ""
    tasks.forEach((task)=>{
        taskList.append(createTask(task))
    })
}

const createTask = (task) => {
    let li = document.createElement("li")
    li.innerText = task.text

    if(task.completed){
        li.classList.add("complete")
    }
    li.onclick = ()=>{
        task.completed = !task.completed
        saveTask()
        displayTask()
    }

    let i = document.createElement("i")
    i.className = "bi bi-trash-fill"

    let btnDelete = document.createElement("button")
    btnDelete.className = "delete"
    btnDelete.append(i)

    btnDelete.onclick = ()=>{
        tasks.splice(tasks.indexOf(task),1)
        saveTask()
        displayTask()
    }

    li.append(btnDelete)

    return li
}

btnAdd.onclick = () => {
    let task = inputTask.value.trim()
    if(task !== ""){
        let newTask = { text: task, completed: false }
        tasks.push(newTask)
        saveTask()
        inputTask.value = ""
        displayTask()
    }
}

displayTask()