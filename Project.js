const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  description: String,
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const projectSchema = new Schema({
  title: { type: String, required: true },
  todos: [todoSchema],
  createdDate: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
