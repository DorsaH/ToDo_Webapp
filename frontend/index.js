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
// sending the http request
    const response = await fetch(backendURL+ "/todos" , options);

    // handle the http response
    const todos = await response.json();
    console.log(todos);
}

getTodos();