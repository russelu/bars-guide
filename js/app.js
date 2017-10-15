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
	
  placeList: ko.observableArray([]),
  mapUnavailable: ko.observable(false),

  popInfoWindow: function() {
      populateInfoWindow(this, largeInfowindow);
  }
};


ko.applyBindings(ViewModel);
