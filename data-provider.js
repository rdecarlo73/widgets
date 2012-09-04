var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var repo = require('./repository.js')
var util = require('./utility.js')

// the location should not need to be passed in.
DataLayer = function(host, port) {
  this.db= new Db('mydb', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

DataLayer.prototype = {

	getCollection : function(callback) {
  		this.db.collection('widgets', function(error, objects) {
    		if( error ) callback(error);
    		else callback(null, objects);
  		});
	},

	get : function(callback) {
    	this.getCollection(function(error, objects) {
      		if( error ) callback(error)
      		else {
        		objects.find().toArray(function(error, results) {
          			if( error ) callback(error)
          			else callback(null, results)
        		});
      		}
    	});
	},


	getById : function(id, callback) {
    	this.getCollection(function(error, objects) {
	      if( error ) callback(error)
	      else {
	        objects.findOne({_id: objects.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
	          if( error ) callback(error)
	          else callback(null, result)
	        });
	      }
	    });
	},

	save : function(objectsToSave, callback) {
    	this.getCollection(function(error, objects) {
	      if( error ) callback(error)
	      else {
	        if( typeof(objectsToSave.length)=="undefined")
	          objectsToSave = [objectsToSave];

	        objects.insert(objectsToSave, function() {
	          callback(null, objectsToSave);
	        });
	      }
	    });
	}
}

new DataLayer('localhost', 27017).save(repo.objects, function(error, articles){});

exports.DataLayer = DataLayer;