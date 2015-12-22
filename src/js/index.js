'use strict';

var parse = require('./parse');

/**
* @param vast :string (url to vast document or vast string);
* @param isString :bool
*/

function vtj(vast, isString) {
	if(isString == undefined) isString = false;
	return parse(vast, isString);
}

module.exports = vtj;