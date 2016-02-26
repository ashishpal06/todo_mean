var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

module.exports = {
    all: function(req, res, next){
		if(!req.user)
			 res.redirect ('/')
        else
			console.log('GetAll' + req.user.username)
            Todo.find({  user: req.user.username}, function (err, todos) {
			if (err) return next(err);
			res.render('todos', { title: 'ToDo App' ,
								user : req.user, 
								todos: todos });
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
		console.log('Username' + req.user.username)
        new Todo({
        user : req.user.username,
		description : todoContent,
		completed : false, 
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
