'use strict';

function parseVast(vastDoc) {

	var $vast = $(vastDoc), data;

	if($vast.find('nobanner').length) {
    	return {
    		nobanner: true
    	}
    }

   	data = {
		nobanner: false,
		hasWrapper: hasWrapper($vast),
		VASTAdTagURI: $vast.find('Ad Wrapper VASTAdTagURI').text(),
		vastClickThrough: '',
        vastImpression: '',
        playerError: ''
	}

	var $clickThrough = $vast.find('VideoClicks ClickThrough');
  
  	if($clickThrough.length) {
  		data.vastClickThrough = getText($clickThrough);
  	}

  	// --

  	data.media = getMediaFiles($vast);

  	// -- 
  	data.vastImpression   = getText($vast.find('Impression'));
  	data.playerError      = getText($vast.find('Error'));   

  	// --

	data.vastExtensions = getVastDataBlock($vast.find('Extensions Extension'), 'type');    
  	data.vastEvents     = getVastDataBlock($vast.find('TrackingEvents Tracking'), 'event');

  	// --

	return data;
}

// --

function getMediaFiles($vast) {
	var $mediaFiles = $vast.find('MediaFiles MediaFile'), media = $(), mediaData = null;

	if ($mediaFiles.length) {
		var vedeoEl = document.createElement('video');

		$mediaFiles.each(function(n,el) {

		  var mediaType = $(this).attr('type');

			if((vedeoEl.canPlayType( mediaType ) == 'maybe') ||
				(vedeoEl.canPlayType( mediaType ) == 'probably') ||
				(mediaType == 'application/x-shockwave-flash') || // vpaid
				(mediaType == 'text/html') // vpaid
			) {

		    	// console.log('mediaType', mediaType);

		    	media = $(this);
		    	return false;

			}

		});


		// если найден подходящий медиатайп
		if(media.length) {
			mediaData = {};

			mediaData.type = media.attr('type'),
	  		mediaData.src = media.text(),
	  		mediaData.apiFramework = media.attr('apiFramework'),
	  		mediaData.width = media.attr('width'),
	  		mediaData.height = media.attr('height');
		}  

	}

	return mediaData
} 

// --

function getVastDataBlock(elems, attr) {
	var obj = {};

    elems.each(function(n, el) {
        var val = $(this).text();
        obj[$(this).attr(attr)] = (isFinite(val) ? parseInt(val) : val);
    });

    return obj;
}

// --

function hasWrapper($vast) {
	return !!$vast.find('Ad Wrapper').length;
}

function getText($el) {
	return $el.text().trim();
}

module.exports = parseVast;