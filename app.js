var express = require('express')
var provider = require('./data-provider.js')

var app = express() 

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var dataProvider = new provider.DataProvider('localhost', 27017);

app.get('/', function(req, res){
  dataProvider.get(function(error, objects){
      res.send(objects);
  });
})

app.listen(8000)
