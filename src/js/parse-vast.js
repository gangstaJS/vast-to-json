'use strict';

var $ = require('jquery');

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
        playerError: '',
        type: '',
        src: '',
        apiFramework: '',
        width: 0,
        height: 0
	}

	var $clickThrough = $vast.find('VideoClicks ClickThrough');
  
  	if($clickThrough.length) {
  	  data.vastClickThrough = $vast.find('VideoClicks ClickThrough').text();
  	}

  	// --

  	var $mediaFiles = $vast.find('MediaFiles MediaFile'), media = $();

	if ($mediaFiles.length) {

	  $mediaFiles.each(function(n,el) {
	    var mediaType = $(this).attr('type');

	    // if(($videoEl.get(0).canPlayType( mediaType ) == 'maybe') ||
	    //   ($videoEl.get(0).canPlayType( mediaType ) == 'probably') ||
	    //   (mediaType == 'application/x-shockwave-flash') || // vpaid
	    //   (mediaType == 'text/html') // vpaid
	    // ) {

	      console.log('mediaType', mediaType);

	      media = $(this);
	      return false;

	    // }
	  });

	  data.type = media.attr('type'),
	  data.src = media.text(),
	  data.apiFramework = media.attr('apiFramework'),
	  data.width = media.attr('width'),
	  data.height = media.attr('height');

	}

  	// --

	return data;
}

// --

function hasWrapper($vast) {
	return !!$vast.find('Ad Wrapper').length;
}

module.exports = parseVast;