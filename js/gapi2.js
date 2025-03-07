// Initialize and add the map
let map;

async function initMap() {

//let currentInfoWindow = null; // Store the currently opened InfoWindow
//const isMobile = false; // window.matchMedia("(pointer: coarse)").matches;

  // The location of Uluru
  const position = { lat: 39.955026386738666, lng: -75.15922757156757 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 2,
    center: position,
    mapId: "MY_MAP_ONE",
  });

  matthew_momjian_geo_locations.forEach((location) => {
    const [country, city, years, lat, lng] = location;
    var printlocation = city ? `${city}, ${country}` : country;
    var info_offset = new google.maps.Size(10, -15);

    var close_timeout = null, close_func, in_mouseover = false;

    const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat: lat, lng: lng },
      title: printlocation,
    });


      // create info box
      var infowindow = new InfoBox({
        content: `${printlocation}<br>${years}`,
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



  });
}

initMap();
