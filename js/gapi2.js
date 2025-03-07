// Initialize and add the map
let map;

async function initMap() {
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
    var city = location[1] + ", " + location[0];
    const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat: location[3], lng: location[4] },
      title: city,
    });

      // Create InfoWindow for subtitle/description
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${city}</h3><p>${location[2]}</p>`,
      });

      // Show InfoWindow on marker click
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

  });
}

initMap();
