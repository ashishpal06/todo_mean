var express = require('express');

/* GET home page.*/
module.exports = {
    index: function(req, res){
        if(req.user)
			res.redirect('/todos');
		else
			res.render('index', { title: 'ToDo App' });
    }};
    