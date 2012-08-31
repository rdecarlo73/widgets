var counter = 1;

var repo = require('./repository.js')
var util = require('./utility.js')

DataProvider = function(){};

DataProvider.prototype = {

	dummyData : [],

	get : function(callback) {
	  callback( null, this.dummyData )
	},

	getById : function(id, callback) {
	  var result = null;
	  for(var i =0;i<this.dummyData.length;i++) {
	    if( this.dummyData[i]._id == id ) {
	      result = this.dummyData[i];
	      break;
	    }
	  }
	  callback(null, result);
	},

	save : function(objects, callback) {
	  var obj = null;

	  if( typeof(objects.length)=="undefined")
	    objects = [objects];

	  for( var i =0;i< objects.length;i++ ) {
	    obj = objects[i];
	    obj.id = counter++;
	    
	    this.dummyData[this.dummyData.length]= obj;
	  }
	  callback(null, objects);
	},

}

/* Lets bootstrap with dummy data */
new DataProvider().save(repo.objects, function(error, articles){});

exports.DataProvider = DataProvider;