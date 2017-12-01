var express = require('express');
var router = express.Router();


// Get all employees
router.get('/', function(req, res, next) {
  require("../db").listAllEmployees(function(employees){
  res.render('index', { title: 'List of employees', empregados: employees });
  });
});

// Create employee
router.get('/create', function(req, res, next) {
  res.render('new', { title: 'Create new Employee', registro: {"nome":"","idade":""}, action: '/save' });
});

// Save employee
router.post('/save', function(req, res, next) {
  var nome  = req.body.name;
  var idade  = req.body.idade;
  require("../db").saveNewEmployee(nome,idade,function(err, result){
    if(err) return console.log(err);
    res.redirect("/");
  });
});

// Edit employee
router.get('/edit/:id', function(req, res) { 
  var id = req.params.id;
    require("../db").findEmployee(id, function(result){      
      res.render('new', { title: 'Edit Employee', registro: result[0], action: '/update/' + result[0]._id });
    });
});

// change employee
router.post('/update/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.name;
  var idade = parseInt(req.body.idade);
    require("../db").updateEmployee(id, {nome, idade}, function(err, result) {
        if(err) return console.log(err); 
        res.redirect('/');
    });
});

// delete register
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  require("../db").deleteEmployee(id, function(err, result) {
    if(err) return console.log(err); 
    res.redirect('/');
  });
});


module.exports = router;
