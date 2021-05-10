// Add map and tile layer
//carto.setDefaultAuth({ username: 'dleech', apiKey: 'b55e5adbfb2e0ba8b592fa378a32036c8a983b9c' });



// Don't forget to replace <YOUR_ACCESS_TOKEN> by your real access token !
const accessToken = 'BjqajQvfUGuVDLAsLtLBRjxqHDNLICiNPBOsPu3aoErdYK1GGSDnAng6rZ8X1dos';
//const map = L.map('map').setView([39.8, -98.5], 5);
let map = L.map("map-canvas", {center: [39.8, -98.5], zoom: 5});

// List of all our defaults styles names
const styles = ['jawg-streets', 'jawg-sunny', 'jawg-terrain', 'jawg-dark'];
const baselayers = {};
// Creating one tile layers for each style
styles.forEach((style) =>
    baselayers[style] = L.tileLayer(
        `https://tile.jawg.io/${style}/{z}/{x}/{y}.png?access-token=${accessToken}`, {
            attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
        }
    )
);

// Set the default layer when you open the map
baselayers['jawg-dark'].addTo(map);
// Associating each style name to its tile layer
L.control.layers(baselayers).addTo(map);














//let map = L.map("map-canvas", {center: [39.8, -98.5], zoom: 4.5});

// Adding Voyager Basemap
//L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
//    maxZoom: 18
//}).addTo(map);

//L.tileLayer(
//    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
//).addTo(map);

// Adding Voyager Labels

//L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
//    maxZoom: 18,
//    zIndex: 10
//}).addTo(map);



var customfishMarker= L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: 'images/fish1.png'
    }
});

var client = new carto.Client({
    apiKey: 'b55e5adbfb2e0ba8b592fa378a32036c8a983b9c',
    username: 'dleech'
});



// Create feature group for drawn items & layer group for previously drawn items
let drawnItems = L.featureGroup().addTo(map);
let cartoData = L.layerGroup().addTo(map);
//let manylayers = L.layerGroup().addTo(map);

// Add Data from Carto using the SQL API
let url = "https://dleech.carto.com/api/v2/sql";
let urlGeoJSON = url + "?format=GeoJSON&q=";
let sqlQuery = "SELECT * FROM airportsforcarto";

fetch(urlGeoJSON + sqlQuery)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        L.geoJSON(data, {onEachFeature: addPopup}).addTo(cartoData);
    });













