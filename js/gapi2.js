// Initialize and add the map
let map;

async function initMap() {

let currentInfoWindow = null; // Store the currently opened InfoWindow
const isMobile = window.matchMedia("(pointer: coarse)").matches;

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

      // Create InfoWindow for subtitle/description
      const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-size: 14px; max-width: 200px; padding: 8px; background: rgba(255, 255, 255, 0.8); border-radius: 5px;">
                 <h3 style="margin: 0; font-size: 16px;">${printlocation}</h3>
                 <p style="margin: 0; color: #555;">${years}</p>
               </div>`
      });

    if (isMobile) {
      // MOBILE: Open popup on tap, close previous one
      marker.addListener("gmp-click", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });

    } else {
      // DESKTOP: Open on hover, close on mouseout
      marker.addListener("mouseover", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });

      marker.addListener("mouseout", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
          currentInfoWindow = null;
        }
      });
    }
  });
}

initMap();
