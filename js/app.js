var Place = function(data) {
	this.location = ko.observable(data.geometry.location);

};

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

var ViewModel = function() {
	var self = this;
	
	
	
};

ko.applyBindings(new ViewModel);
