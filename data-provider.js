var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var repo = require('./repository.js')
var util = require('./utility.js')

DataProvider = function(host, port) {
  this.db= new Db('node-mongo-widgets', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


DataProvider.prototype.getCollection= function(callback) {
  this.db.collection('widgets', function(error, article_collection) {
    if( error ) callback(error);
    else callback(null, article_collection);
  });
};

DataProvider.prototype.get = function(callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


DataProvider.prototype.getById = function(id, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

DataProvider.prototype.save = function(objects, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        if( typeof(articles.length)=="undefined")
          articles = [articles];

        for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
        }

        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });
};

new DataProvider('localhost', 27017).save(repo.objects, function(error, articles){});

exports.DataProvider = DataProvider;