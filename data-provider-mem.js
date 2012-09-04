var counter = 1;

var repo = require('./repository.js')
var util = require('./utility.js')

DataLayer = function(){};

DataLayer.prototype = {

	dummyData : [],

	// getConfiguration : function(callback) {}
	
	// saveConfiguration : function(callback) {}
	
	// refresh : function(callback) {}

	// getDictionary : function(callback) {}

	// getPicklist : function(callback) {}

	// getCount : function(callback) {}

	// getIdentifiers : function(callback) {}

	get : function(callback) {
	  callback( null, this.dummyData )
	},

	getByIdentifier : function(id, callback) {
	  var result = null;
	  for(var i =0;i<this.dummyData.length;i++) {
	    if( this.dummyData[i]._id == id ) {
	      result = this.dummyData[i];
	      break;par
	    }
	  }
	  callback(null, result);
	},
	
	// search : function(callback) {}
	
	// searchCount : function(callback) {}

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
	
	// delete : function(callback) {}
	
	// deleteByIdentifier : function(callback) {}
	
	// getRelated : function(callback) {}
	
	// getRelatedCount : function(callback) {}
	
	// getRelatedPaged : function(callback) {}
}

/* Lets bootstrap with dummy data */
new DataProvider().save(repo.objects, function(error, articles){});

exports.DataProvider = DataProvider;