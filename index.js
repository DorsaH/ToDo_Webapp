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














// run the server
app.listen(2000, () => {
    console.log("Server has started");
});

// connect to database
const connectionString = "mongodb+srv://jokesene:OB4ZhCmvaBmZtPPS@main-cluster.jqtcoe5.mongodb.net/todo_db";

mongoose.connect(connectionString)
    .then(() => {console.log("Connection successful!")})
    .catch((err) => {console.log(err)});