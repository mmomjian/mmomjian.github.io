// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
	var myLatlng = new google.maps.LatLng(15, 11);

  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 2, center: myLatlng});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
		        function createMarker(map_pins, lat, lng, locstr) {
      // create point
      var latlng = new google.maps.LatLng(lat, lng)

      // create marker
      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        // in 'both' mode, display family pins offset and below
      });

      // create info box
      var infowindow = new InfoBox({
        content: locstr,
        disableAutoPan: true,
        closeBoxURL: '',
        enableEventPropagation: true, // used for map labels
      });

      // Show this marker's description when the mouse is over it
      google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
      });
      google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
      });
    }

    // Add map pins
    function addMapPins(map_pins, description) {
	for (var loc = 0; loc < map_pins.length; loc++)
	{
	    var years = map_pins[loc][2];

	    if (/\),/.test(years))
			years = years.replace(/\), */g, '),<br />');
	    years = '<div style="text-align: center">' + years + '</div>';

	    createMarker(map_pins,
			 map_pins[loc][3],
			 map_pins[loc][4],
			 map_pins[loc][1] + map_pins[loc][0],
			 years);
	}
    }

		    addMapPins(matthew_momjian_geo_locations, "Travel");
