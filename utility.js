var queryStringFilter = function connect(obj) {
	for ( var propertyName in this ) {

		var value = this[propertyName];

		if (obj[propertyName] != value){
			return false
		}
	};
	
	return true;
}

var idFilter = function connect(obj) {
	
	if (obj['id'] == this){
		return true
	};
	
	return false;
}

exports.queryStringFilter = queryStringFilter;
exports.idFilter = idFilter;