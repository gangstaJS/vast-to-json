'use strict';

var process = require('./vast-get-wrappers');
var mergeWrappers = require('./merge-wrappers');


// --

function parseFullVAST(vast, isString) {
	var deferred = $.Deferred();

	var wrappers = process(vast, isString);

	wrappers.then(function(wr) {

		deferred.resolve( mergeWrappers(wr) );
	
	});

	return deferred.promise();
}


module.exports = parseFullVAST;