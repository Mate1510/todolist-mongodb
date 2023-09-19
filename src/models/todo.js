const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

module.exports = Todo;
