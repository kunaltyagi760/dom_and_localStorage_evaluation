const createTask = document.getElementById("btn1")
let arr = JSON.parse(localStorage.getItem("tasks")) || []
let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || []


const displayRow = (arr) => {
    arr.forEach((el) => {
        let row = document.createElement("tr")
        row.className = "row"
        row.innerHTML = `<td>${el.title}</td>
        <td>${el.priority}</td>
        <td>${el.status}</td>
        <td class="remove_btn" onclick="restore(${el.id})">restore</td>
        <td class="remove_btn" onclick="deleteTask(${el.id})">delete</td>`

        let tBody = document.querySelector("tbody")
        tBody.append(row)
    })
}

const deleteTask = (taskId) => {
    deletedTasks = deletedTasks.filter((item)=> item.id !== taskId)
    
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))

    location.reload();
}

const restore = (taskId) => {
    let restoreTask = deletedTasks.find((item) => item.id===taskId)

    arr.push(restoreTask)

    localStorage.setItem("tasks",JSON.stringify(arr))

    deletedTasks = deletedTasks.filter((item)=> item.id !== taskId)
    
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))

    location.reload();
}

const filterPriority = () => {
    let priority = document.getElementById("filterByPriority").value
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = null;

    if (priority === ""){
        displayRow(deletedTasks);
    } else{
        let filterTask = deletedTasks.filter((item) => item.priority === priority)

        displayRow(filterTask);
    }
}

const filterStatus = () => {
    let status = document.getElementById("filterByStatus").value
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = null;

    if (status === ""){
        displayRow(deletedTasks);
    } else{
        let filterTask = deletedTasks.filter((item) => item.status === status)

        displayRow(filterTask);
    }
}

displayRow(deletedTasks);