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

const redDot = document.createElement("div");
redDot.style.width = "16px";  // Set width of the red dot
redDot.style.height = "16px"; // Set height of the red dot
redDot.style.backgroundColor = "red"; // Set the color to red
redDot.style.borderRadius = "50%"; // Make it circular
redDot.style.border = "2px solid #fff"; // Optional: add a white border for contrast
redDot.style.boxShadow = "0 0 2px rgba(0, 0, 0, 0.4)"; // Optional: add some shadow for better visibility

    const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat: lat, lng: lng },
      title: printlocation,
      content: redDot,
//headerDisabled: true
    });


    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-size: 14px; max-width: 180px; padding: 0px;
                         background: rgba(255, 255, 255, 0.9); border-radius: 1px;">
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
 });
}

initMap();
