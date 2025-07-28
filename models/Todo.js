const mongoose = require("mongoose");

// define todo schema
const todoSchema = mongoose.Schema({
    text: {type: String, required: true},
});

// create todo model
const todoModel = mongoose.model("todo_items", todoSchema);

// export model
module.exports = todoModel;