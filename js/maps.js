var map;
var service;
var largeInfowindow;
var bounds;
var current_marker;

var defaultIcon;
var highlightedIcon;
var bounceAnimation;

function initMap() {
	// First check if Google Maps API successfully loaded
	// https://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
	if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
		map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 42.2808, lng: -83.7430},
            zoom: 15,
            styles: styles
        });
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: {lat: 42.2808, lng: -83.7430},
            radius: 2000,
            rankby: 'distance',
            type: 'bar'
        }, function(results, status) {
           	if (status == google.maps.places.PlacesServiceStatus.OK) {
           		results.forEach(function(bar){
           			createMarker(bar);
           		})
            } else {
            	default_places.forEach(function(bar){
           			createMarker(bar);
           		})
                window.alert('We could not find any bars thru Google Maps API. Using default database.');
              }
            });

            largeInfowindow = new google.maps.InfoWindow();
            bounds = new google.maps.LatLngBounds();
			// Style the markers a bit. This will be our listing marker icon.
            defaultIcon = makeMarkerIcon('0091ff');
            // Create a "highlighted location" marker color for when the user
			// mouses over the marker.
            highlightedIcon = makeMarkerIcon('FFFF24');
            bounceAnimation = google.maps.Animation.BOUNCE;
	} else {
		ViewModel.mapUnavailable(true);
	}

	function makeMarkerIcon(markerColor) {
    	var markerImage = new google.maps.MarkerImage(
        	'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        	'|40|_|%E2%80%A2',
        	new google.maps.Size(21, 34),
        	new google.maps.Point(0, 0),
        	new google.maps.Point(10, 34),
        	new google.maps.Size(21,34));
    	return markerImage;
	}

	function createMarker(place) {
    	var marker = new google.maps.Marker({
      		position: place.geometry.location,
        	map: map,
        	title: place.name,
        	icon: defaultIcon
    	});
    	ViewModel.placeList.push(marker);
    	marker.addListener('mouseover', function() {
        	this.setIcon(highlightedIcon);
    	});
    	marker.addListener('mouseout', function() {
        	this.setIcon(defaultIcon);
    	});
    	marker.addListener('click', function(){
        	populateInfoWindow(this, largeInfowindow);
    	});
    	bounds.extend(marker.position);
	}
}

function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
    	if (current_marker != null) {
    		current_marker.setIcon(defaultIcon);
    	}
    	current_marker = marker;
    	current_marker.setIcon(highlightedIcon);
        infowindow.marker = marker;

	    // make marker bouncing for 750ms
	    // https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
	    marker.setAnimation(bounceAnimation);
    	setTimeout(function(){ marker.setAnimation(null); }, 750);

        // asynchronized Foursquare API call
        // add venue info & venue picture
        // Getting location parameters
        // Notice: lat & lng from Google Maps response JSON use type of function
        // so here we have to pass the return values
        var lat = marker.position.lat();
        var lng = marker.position.lng();
        // First search via F2 API to find the nearest venue to this location
        var f2_url = 'https://api.foursquare.com/v2/venues/search?ll='+
        	lat+','+lng+'&client_id='+f2_id+'&client_secret='+f2_secret+'&llAcc=1&v=20171003';
        $.getJSON(f2_url, function(data1){
        	var venue_id = data1.response.venues[0].id;
        	var venue_query_url = 'https://api.foursquare.com/v2/venues/'+venue_id+'?client_id='
        		+f2_id+'&client_secret='+f2_secret+'&v=20171003';
        	$.getJSON(venue_query_url, function(data2){
        		// Get F2 rating and url from response
        		var rating = data2.response.venue.rating;
        		var f2Url = data2.response.venue.canonicalUrl;
        		infowindow.setContent('<div>' + marker.title + '</div><div><a href="'+f2Url+'">Foursquare Rating: '+rating+'</a></div>');
        	}).fail(function(e){
        		// This error handler was '.error()' in course
        		// which was quite misleading
        		infowindow.setContent('<div>' + marker.title + '</div></div><div>Foursquare Venue API cannot loaded</div>');
        	})
        }).fail(function(e){
        	infowindow.setContent('<div>' + marker.title + '</div></div><div>Foursquare API cannot loaded</div>');
        })

        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
           	infowindow.setMarker = null;
        })
        // move map center to current_marker
	    map.panTo(marker.getPosition())

    }
}

// this is an Assasin's Creed theme Google Maps style
var styles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4d6059"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7f8d89"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#7f8d89"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#2b3638"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2b3638"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#24282b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#24282b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

var f2_id = 'NVGB1FWN4PZ0IQONSNOOID2ZHFF0DS0GO2OIUZHXAXECQ1VC';
var f2_secret = 'FREG5SGHVEIXTOWMCTSEKSL4CPB2K5AU5CNHK4ZP5JXOF0V3';