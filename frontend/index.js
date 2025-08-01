const dateElement = document.getElementById("date");

// set the date
const date = new Date();
dateElement.innerHTML = date.toLocaleDateString();

const backendURL = "http://localhost:2000";
// ===================================
async function getTodos(){
    //
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
// sending the http request and handle response
    const response = await fetch(backendURL+ "/todos" , options);

    const todos = await response.json();
    // console.log(todos);

    //render html
    const todoItemsContainer = document.getElementById("todo-items");
    todos.forEach((todoItem) => {
        console.log(todoItem.text);

        //creat the list item elemnt
        const todoListItem = document.createElement("li");


        todoListItem.innerHTML = todoItem.text;

        //create button
        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Update";
        updateBtn.classList.add("todo-buttons");
    
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("todo-buttons");
        deleteBtn.addEventListener("click",() =>{
            deleteTodo(todoItem._id);
        });

        //create a div for grouping buttons
        const buttonDiv = document.createElement("div");
        buttonDiv.appendChild(updateBtn);
        buttonDiv.appendChild(deleteBtn);

        todoListItem.appendChild(buttonDiv);

        todoItemsContainer.appendChild(todoListItem);



    });

}

async function postTodo(){
    const todoInput = document.getElementById("todo-input");
    let todoValue = todoInput.value;

    //
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body: `{text : ${todoValue};}`
        // or better formatting:
        body : JSON.stringify({
            text : todoValue
        })
    };
// sending the http request and wait for response
    const response = await fetch(backendURL+ "/todos" , options);

    // handling the response
    if(response.ok){
        console.log("Todo item is added successfully!");
        location.reload();
    }else{
        console.log("Todo item could not be added!");
    }
    // console.log(todos);
}

async function deleteTodo(id){
    //define http request options
    const options = {
        method : "DELETE"
        // and we don't need the header as we are not sending anything
    }

    // send the http request and wait for response
    const response = await fetch(backendURL + "/todos/"+ id , options);

    //handle response
    if (response.ok){
        console.log("Delete successfull;");
        location.reload();
    } else {
        console.log("Delete unsuccessfull");
        
    }

}
getTodos();