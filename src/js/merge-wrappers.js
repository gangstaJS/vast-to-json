'use strict';

var _ = require('underscore');

function merge(wrappers) {
	var resultData = {};

	// если нет рекламы для показа <nobanner /> или не было найдено поддерживаемого контента
	if(wrappers[0].nobanner || (wrappers[wrappers.length-1].media == null)) { // TODO сделать проверку на nobanner для всех уровней врапперов.
		return {nobanner: true};
	}

	// --

	resultData.media = wrappers[wrappers.length-1].media;
	resultData.nobanner = wrappers[0].nobanner;
	resultData.playerError = [];
	resultData.vastClickThrough = wrappers[0].vastClickThrough;
	resultData.vastEvents = {};
	resultData.vastExtensions = {};
	resultData.vastImpression = [];

	_.each(wrappers, function(el,n) {

		if(el.playerError) resultData.playerError.push(el.playerError);

		// impression
		if(el.vastImpression) resultData.vastImpression.push(el.vastImpression);

		// events
		_.each(el.vastEvents, function(v,k) {

			if(resultData.vastEvents[k]) {
				if(v) resultData.vastEvents[k].push( v.trim() );
			} else {
				resultData.vastEvents[k] = [];
				if(v) resultData.vastEvents[k].push( (isFinite(v) ? parseInt(v) : v.trim()) );
			}

		});

		// extensions
		_.each(el.vastExtensions, function(v,k) {

			if(resultData.vastExtensions[k]) {
				if(v) resultData.vastExtensions[k].push( (isFinite(v) ? parseInt(v) : v.trim()) );
			} else {
				resultData.vastExtensions[k] = [];
				if(v) resultData.vastExtensions[k].push( (isFinite(v) ? parseInt(v) : v.trim()) );
			}

		});

	});

	return resultData; //wrappers[0];
}

module.exports = merge;