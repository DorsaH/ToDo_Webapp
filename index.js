// import packages
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cors("*"));

// import models
const todoModel = require("./models/Todo.js");

// GET request
app.get("/todos", async (req, res) => {
    try {
        // retrieve collection documents
        const response = await todoModel.find({});
        console.log(response);

        // send response
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Get request failed: " + err);
    }
});

// POST request
app.post("/todos", async (req, res) => {
    try {
        // retrieve body data
        const todo = req.body;

        // create new todo item entry
        await todoModel.create(todo);

        res.status(200).send("Post request successful");
    } catch (err) {
        console.log(err);
        res.status(500).send("Post request unsuccessful: " + err);
    }
});




// DELETE request
app.delete("/todos/:id", async (req, res) => {
    try {
        // get URL parameter
        const id = req.params.id;

        // find and delete entry in the database
        await todoModel.findByIdAndDelete(id);

        res.status(200).send("Deleted item: " + id);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to delete item: " + id);
    }
});




// PUT request
app.put("/todos/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const newText = req.body.text ;
        console.log(id);
        console.log(newText);

        //create a new todo item and update it
        const newTodo = {
            "text" : newText
        };
        await todoModel.findByIdAndUpdate(id, newTodo);
        res.status(200).send("PUT request recieved")

    }catch(error){
        console.log(error);
        res.status(500).send("PUT request failed: " + error);
    }
});



// run the server
app.listen(2000, () => {
    console.log("Server has started");
});

// connect to database
const connectionString = "mongodb+srv://dorsa:Ey3Epcp5EEWJ8P5Y@main-cluster.ingmzd5.mongodb.net/todoDB";

mongoose.connect(connectionString)
    .then(() => {console.log("Connection successful!")})
    .catch((err) => {console.log(err)});