var default_places = [
	{
		"geometry" : {
            "location" : {
               "lat" : 42.2791584,
               "lng" : -83.7484618
            }
        },
		"name": "Jolly Pumpkin Café & Brewery"
	},
	{
		"geometry" : {
            "location" : {
               "lat" : 42.28030979999999,
               "lng" : -83.74780079999999
            }
        },
        "name" : "Arbor Brewing Company Brewpub"
	},
	{
		"geometry" : {
            "location" : {
               "lat" : 42.2803524,
               "lng" : -83.74944139999999
            }
        },
        "name" : "Frita Batidos"
	},
	{
		"geometry" : {
            "location" : {
               "lat" : 42.2806313,
               "lng" : -83.7494193
            }
        },
        "name" : "Grizzly Peak Brewing Co."
	},
	{
		"geometry" : {
            "location" : {
               "lat" : 42.279399,
               "lng" : -83.74892299999999
            }
        },
        "name" : "Black Pearl Ann Arbor"
	}
]

var ViewModel = {
	
  // Initialize array of markers
  placeList: ko.observableArray([]),
  // Once this property set to TRUE, turn the error prompt to visible in html
  mapUnavailable: ko.observable(false),

  popInfoWindow: function() {
      populateInfoWindow(this, largeInfowindow);
  },

  query: ko.observable('')
  
};

ViewModel.filtered = ko.computed(function(){
    // filter the placeList according to data-binded query observable
    // https://stackoverflow.com/questions/29551997/knockout-search-filter
    var self = this;
    return ko.utils.arrayFilter(self.placeList(), function (marker) {
      if (marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
      return marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    })
  }, ViewModel);

function googleError() {
  ViewModel.mapUnavailable(true);
}

ko.applyBindings(ViewModel);
