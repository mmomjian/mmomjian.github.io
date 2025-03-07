// Initialize and add the map
let map;

async function initMap() {

let currentInfoWindow = null; // Store the currently opened InfoWindow
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
  icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="red"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(10, 10), // Set the size of the marker
  }

    });


    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-size: 14px; max-width: 180px; padding: 6px; 
                         background: rgba(255, 255, 255, 0.9); border-radius: 5px;">
                 <strong>${printlocation}</strong><br>${years}
               </div>`
    });


      marker.addListener("gmp-click", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });




  });

// Close InfoWindow on any map click
map.addListener("click", () => {
  if (currentInfoWindow) {
    currentInfoWindow.close();
    currentInfoWindow = null;  // Reset currentInfoWindow after closing
  }

}

initMap();
