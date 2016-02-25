var express = require('express');
//var router = express.Router();

module.exports = {
    index: function(req, res){
        res.redirect('/todos');
    }};
    
/* GET home page.
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('/todos');
});

module.exports = router; */
