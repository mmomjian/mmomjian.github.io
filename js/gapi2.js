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

    const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat: lat, lng: lng },
      title: printlocation,
    });


      // create info box
      var infowindow = new google.maps.InfoWindow({
        content: `${printlocation}<br>${years}`,
        disableAutoPan: true,
        closeBoxURL: '',
        enableEventPropagation: true, // used for map labels
//        pixelOffset: info_offset
      });




  });
}

initMap();
