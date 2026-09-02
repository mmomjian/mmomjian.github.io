// Initialize and add the map
let map;

async function initMap() {

  let currentPopup = null; // Store the currently opened popup

  // generic home town
  const position = [39.95, -75.15];

  // The map, centered at Uluru
  map = L.map("map").setView(position, 2);
  map.attributionControl.setPrefix(false);

  // OpenFreeMap's "liberty" style is vector tiles, so labels can be rewritten
  // client-side. Its default text-field concatenates a Latin transliteration
  // with the local script (e.g. "Tokyo 東京"); swap that for name_en so labels
  // are normalized to English.
  const style = await fetch("https://tiles.openfreemap.org/styles/liberty").then((r) => r.json());
  style.layers.forEach((layer) => {
    const textField = layer.layout && layer.layout["text-field"];
    if (layer.type === "symbol" && textField && JSON.stringify(textField).includes("name:nonlatin")) {
      layer.layout["text-field"] = ["coalesce", ["get", "name_en"], ["get", "name"]];
    }
  });

  L.maplibreGL({ style }).addTo(map);

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
