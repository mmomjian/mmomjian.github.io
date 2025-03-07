// google_map_api.js

// Display Info Windows Above Markers

"use strict";

(function()
{
        // http://austinmatzko.com/2008/04/14/addevent-preserving-this/
        var addEvent = function( obj, type, fn ) {
                if (obj.addEventListener)
                        obj.addEventListener(type, fn, false);
                else if (obj.attachEvent)
                        obj.attachEvent('on' + type, function() { return fn.apply(obj, new Array(window.event));});
        };

        addEvent(window, 'load', display_map);
})();

function display_map() {
    // Use longitude so map is continent-aligned on start
    var myLatlng = new google.maps.LatLng(15, 11);

    var myOptions = {
      zoom: 2,
      center: myLatlng,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), myOptions);

    // offset of info box from marker
    var info_offset = new google.maps.Size(10, -15);

    var close_timeout = null, close_func, in_mouseover = false;

    // Creates a marker whose info window displays the given location string
    function createMarker(map_pins, lat, lng, locstr) {
      // create point
      var latlng = new google.maps.LatLng(lat, lng)

      // create marker
      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
      });

      // create info box
      var infowindow = new InfoBox({
        content: locstr,
        disableAutoPan: true,
        closeBoxURL: '',
        enableEventPropagation: true, // used for map labels
        pixelOffset: info_offset
      });

      // Show this marker's description when the mouse is over it
      google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
        in_mouseover = true;
      });
      google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
        in_mouseover = false;
      });

      // For touch screens
      google.maps.event.addListener(marker, 'mousedown', function() {
        // don't use click timer in mouse over
        if (!in_mouseover)
        {
            // close an open window?
            if (close_timeout !== null)
            {
                // must be first
                clearTimeout(close_timeout);
                close_func();
            }
            infowindow.open(map, marker);
         }
      });
      google.maps.event.addListener(marker, 'mouseup', function() {
        if (!in_mouseover)
        {
            // give time to view the text once finger is removed
            close_func = function() { close_timeout = null; infowindow.close(map, marker); };

            close_timeout = setTimeout(close_func, 4000);
        }
      });
    }

    // Add map pins
    function addMapPins(map_pins) {
        for (var loc = 0; loc < map_pins.length; loc++)
        {
            var years = map_pins[loc][2];

            if (/\),/.test(years))
                        years = years.replace(/\), */g, '),<br />');
            years = '<div style="text-align: center">' + years + '</div>';

            createMarker(map_pins,
                         map_pins[loc][3],
                         map_pins[loc][4],
                         map_pins[loc][1] +
                         ((map_pins[loc][1] !== '') ? ', ' : '') +
                         map_pins[loc][0] + '<br />' +
                         ((map_pins[loc][1] !== '') ? ', ' : '') +
                         map_pins[loc][0] + '<br />' +
                                (is_both ? description + "<br />" : "") +
                         years);
        }
    }

    addMapPins(matthew_momjian_geo_locations);

}

