// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
  notify_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);