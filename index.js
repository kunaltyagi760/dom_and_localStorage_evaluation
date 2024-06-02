const createTask = document.getElementById("btn1")

createTask.addEventListener("click", () => {
    const task = document.getElementById("task").value;
    const priorty = document.getElementById("priority").value
    
    if (task && priorty){
        let arr = JSON.parse(localStorage.getItem("tasks")) || []

        let obj = {
                title: task,
                priority: priorty,
                status: "pending"
               }

        arr.push(obj);

        localStorage.setItem("tasks",JSON.stringify(arr))

        arr.forEach((el) => {
            let row = document.createElement("tr")
            row.className = "row"
            row.innerHTML = `<td>${el.title}</td>
            <td>${el.priority}</td>
            <td id="change_btn" onclick="change()">${el.status}</td>
            <td id="remove_btn" onclick="remove()">remove</td>`

            let table = document.getElementById("table")
            table.append(row)
        })

    }
    else{
        alert("Task cannot be empty!")
    }
})
