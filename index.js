const createTask = document.getElementById("btn1")
let arr = JSON.parse(localStorage.getItem("tasks")) || []
let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || []

createTask.addEventListener("click", () => {
    const task = document.getElementById("task").value;
    const priorty = document.getElementById("priority").value
    
    if (task && priorty){

        let check1 = arr.find((t) => t.title === task)
        let check2 = deletedTasks.find((t) => t.title === task)

        if (check1 || check2){
            location.reload()
            return alert("This task is already exist on Home page or Deleted Tasks page. Please enter another title to create task!")
        }

        let num = Number(localStorage.getItem("num")) + 1 || 1
        localStorage.setItem("num",num)

        let obj = {
                id: num,
                title: task,
                priority: priorty,
                status: "pending"
               }

        arr.push(obj);

        localStorage.setItem("tasks",JSON.stringify(arr))

        location.reload();

        // const tBody = document.querySelector("tbody")
        // tBody.innerHTML = null;

        // displayRow()
    }
    else{
        alert("Task cannot be empty!")
    }
    
})

const remove = (taskId) => {
    let deleteTask = arr.find((item) => item.id===taskId)

    deletedTasks.push(deleteTask)

    localStorage.setItem("deletedTasks",JSON.stringify(deletedTasks))

    arr = arr.filter((item) => item.id !== taskId)

    localStorage.setItem("tasks",JSON.stringify(arr))

    location.reload()

}


const toggle = (taskId) => {
    arr.forEach((task) => {
        if (task.id === taskId){
            let cur_status = task.status;

            if (cur_status === "pending"){
                task.status = "in-progress"
            }
            else if (cur_status === "in-progress"){
                task.status = "complete"
            }
            else{
                task.status = "pending"
            }
        }
    })

    localStorage.setItem("tasks",JSON.stringify(arr));

    location.reload();
    
}

const displayRow = () => {
    arr.forEach((el) => {
        let row = document.createElement("tr")
        row.className = "row"
        row.innerHTML = `<td>${el.title}</td>
        <td>${el.priority}</td>
        <td class="change_btn" onclick="toggle(${el.id})">${el.status}</td>
        <td class="remove_btn" onclick="remove(${el.id})">remove</td>`

        let tBody = document.querySelector("tbody")
        tBody.append(row)
    })
}

displayRow();
