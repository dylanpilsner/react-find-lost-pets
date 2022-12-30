const MapboxClient = require("mapbox");

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZHlsYW5kZXYiLCJhIjoiY2xiMDNtbHBnMWZxazN2bnBvczJ5MnU0MyJ9.amcslgDMLVFcS3PrmpPSMA";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

export { mapboxClient, MAPBOX_TOKEN };
