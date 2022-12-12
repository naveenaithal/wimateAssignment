const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
// nvn
  taskName: {
    type: String,
    required: true,
    },
  description: {
    type: String,
    required: true,
    },
  priority: {
    type: String,
    required: true,
    },
  status: {
    type: String,
    required: true,
    },
  dueDate: {
    type: String,
    required: true,
    },
})
module.exports = mongoose.model('Todo',todoSchema)