'use strict';

var $ = require('jquery');
var process = require('./vast-get-wrappers');


// --

function parseFullVAST(vast, isString) {
	var deferred = $.Deferred();

	var wrappers = process(vast, isString);

	wrappers.then(function(wr) {

		deferred.resolve(wr)
	
	});

	return deferred.promise();
}


module.exports = parseFullVAST;