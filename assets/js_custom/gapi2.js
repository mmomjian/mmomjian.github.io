// Initialize and add the map
let map;

function initMap() {

  let currentPopup = null; // Store the currently opened popup

  // The location of Uluru
  const position = [39.955026386738666, -75.15922757156757];

  // The map, centered at Uluru
  map = L.map("map").setView(position, 2);
  map.attributionControl.setPrefix(false);

  // OSM consolidated to a single tile host; the old a/b/c subdomain sharding is no longer used
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  matthew_momjian_geo_locations.forEach((location) => {
    const [country, city, years, lat, lng, color = "red"] = location;
    var printlocation = city ? `${city}, ${country}` : country;

    const marker = L.circleMarker([lat, lng], {
      radius: 6,
      color: "#fff",
      weight: 2,
      fillColor: color,
      fillOpacity: 1,
    }).addTo(map);

    const popupContent = `<div class="custom-info-window">
                 <strong>${printlocation}</strong><br>${years}
               </div>`;

    marker.bindPopup(popupContent);

    marker.on("mouseover", () => {
      if (currentPopup && currentPopup !== marker) {
        currentPopup.closePopup();
      }
      marker.openPopup();
      currentPopup = marker;
    });

    marker.on("mouseout", () => {
      if (currentPopup === marker) {
        marker.closePopup();
        currentPopup = null;
      }
    });

  });

  // Close popup on any map click
  map.on("click", () => {
    if (currentPopup) {
      currentPopup.closePopup();
      currentPopup = null;
    }
  });
}

initMap();
