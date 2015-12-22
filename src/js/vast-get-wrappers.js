'use strict';

var $ = require('jquery');
var parseVast = require('./parse-vast');

var wrappers = [], deferred;

// --

function process(param, isString) {
	
	deferred = $.Deferred();

	var defer;

	if(isString) {

		var data = parseVast( $.parseXML(param) );

		wrappers.push(data);

		if(!data.nobanner && data.hasWrapper) {
			defer = vastRequest(param);
			defer.then(d);
		} else {
			deferred.resolve(wrappers);
		}

	} else {

		defer = vastRequest(param);
		defer.then(d);
	
	}
	
	return deferred.promise();
}

// --

function d(xml) {
	var defer, url = '';

	var data = parseVast(xml);

	wrappers.push(data);

	if(!data.nobanner && data.hasWrapper) {
		url = data.VASTAdTagURI; // $vast.find('Ad Wrapper VASTAdTagURI').text();
		defer = vastRequest(url);
		defer.then(d);
	} else {
		deferred.resolve(wrappers);
	} 
}

// --

function vastRequest(vastURL, xhrFields) {
    if (xhrFields == undefined) {
        xhrFields = {
            withCredentials: true
        };
    }

    return $.ajax({
        url: vastURL,
        dataType: 'xml',
        xhrFields: xhrFields
    }).promise();
}

// --

module.exports = process;