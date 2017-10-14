var Place = function(data) {
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
};

var places = [
	{
		lat: 0,
		lng: 0,
		name: 'Sample'
	}
]

var ViewModel = function() {
	var self = this;
	
	this.placeList = ko.observableArray([]);

	places.forEach(function(place){
		self.placeList.push(new Place(place))
	});
	
};

ko.applyBindings(new ViewModel);
