var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

module.exports = {
    all: function(req, res, next){
        Todo.find({}, function (err, todos) {
        if (err) return next(err);
        res.render('todos', { todos: todos });
    });
    },

    viewOne: function(req, res, next){
        Todo.find({_id: req.params.id}, function (err, todos) {
        if (err) return next(err);
        res.render('todos', { todos: todos });
		});
    },
	
    add: function(req, res, next){
        var todoContent = req.body.content;
		var todoTime = req.body.todotime;
        // create & insert todo
        new Todo({
        description : todoContent,
        notify_at   : todoTime
        }).save( function( err, todo, count ){
        res.redirect( '/' );
       });
    },
    remove: function(req, res, next){
        var id = req.params.id;
		console.log('Removing ' + req.params.id);
        Todo.findByIdAndRemove(id, function(err, todo){
        if(err) res.render('error', { error: 'Error deleting todo'});
        res.redirect('/');
        });
    },
    edit: function(req, res, next){
        console.log('Todo ' + req.params.id + ' updated')
    }
};

/* GET /todos listing. */
/*router.get('/', function(req, res, next) {
  Todo.find({}, function (err, todos) {
    if (err) return next(err);
    //res.json(todos);
    res.render('todos', { todos: todos });
  });
});

/* POST /todos 
router.post('/', function(req, res, next) {
  var todoContent = req.body.content;
  // create & insert todo
  new Todo({
    description : todoContent,
    notify_at   : Date.now()
  }).save( function( err, todo, count ){
    res.redirect( '/todos' );
  });
});


router.post('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  Todo.findByIdAndRemove(id, function(err, todo){
  if(err) res.render('error', { error: 'Error deleting todo'});
     res.redirect('/todos');
   });
});
module.exports = router;*/