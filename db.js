var mongoClient = require("mongodb").MongoClient;
    mongoClient.connect("mongodb://localhost:27017/crud",
    function(err, conn){
        if(err) return console.log(err);
        global.db = conn;
    })

var ObjectId = require("mongodb").ObjectId; 


function saveNewEmployee(nome, idade, callback){
    global.db.collection("crud").insert({nome,idade}, function(err, result){
        if(err) return console.log(err);
        callback();
    });
}

function listAllEmployees(callback){
    global.db.collection("crud").find().toArray( function(err, result){
        if(err) return console.log(err);
        callback(result);
    });
}

function findEmployee(id, callback){ 
    global.db.collection("crud").find( {_id: new ObjectId(id)}).toArray(function(err, result){
        if(err) return console.log(err);
        callback(result); 
    });
}

function updateEmployee(id, customer, callback){
    global.db.collection("crud").updateOne({_id: new ObjectId(id)}, customer, function(err, result){
        if(err) return console.log(err);
        callback();
    });
}

function deleteEmployee(id, callback){
    global.db.collection("crud").deleteOne({_id: new ObjectId(id)}, function(err, result){
        if(err) return console.log(err);
        callback();
    });
}

module.exports = { saveNewEmployee, listAllEmployees, findEmployee, updateEmployee, deleteEmployee }