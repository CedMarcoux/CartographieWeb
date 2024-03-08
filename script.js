// Importatation de la carte et ses paramètres
var map = L.map('map').setView([46.84218988544697, -71.3285654245193], 11);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// différent fond de carte
var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var EsriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//Ajout de l'échelle
L.control.scale().addTo(map);

//Importation et utilisation des icons pour les points
var iconObserve = L.divIcon({
    class: 'icon',
    html: '<img src="Images/Icones/binocular.svg" alt="" />',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});
var iconPerdu = L.divIcon({
    class: 'icon',
    html: '<img src="Images/Icones/questionmark.svg" alt="" />',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

//variable pour le layer control
var arrondissementLayer = {
    //Importation du Geojson des arrondissements {}
    "Arrondissement": L.geoJSON(Arrondissement, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.NOM);
        },
        //aller chercher le style dans les propriétés du geojson
        style: function (feature) {
            return {
                color: feature.properties.stroke,
                weight: feature.properties['stroke-width'],
                opacity: feature.properties['stroke-opacity'],
                fillColor: feature.properties.fill,
                fillOpacity: feature.properties['fill-opacity']
            };
        }
    }).addTo(map)
}

//variable pour le layer control
var chienPerdulayer = {
    //Importation du geojson de chien perdu
    "Chien perdu": L.geoJSON(chienperdu, {
        //Popup pour interroger la donnée
        onEachFeature: function (feature, layer) {
            var popupContent =
                "Nom: " + feature.properties.Nom + "<br>" +
                "Race: " + feature.properties.Race + "<br>" +
                "Date de disparition: " + feature.properties.Date + "<br>" +
                "État: " + feature.properties.État;
            layer.bindPopup(popupContent)
        },
        //Implantation de l'icone
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: iconPerdu });
        }
    }).addTo(map)
}
//variable pour le layer control
var chienObserveLayer = {
    //Importation du Geojson des chiens observé
    "Chien observé": L.geoJSON(chienobserve, {
        //Popup pour interroger la donnée
        onEachFeature: function (feature, layer) {
            var popupContent2 =
                "Race: " + feature.properties.Race + "<br>" +
                "Date d'obervation: " + feature.properties.Date + "<br>" +
                "État: " + feature.properties.État;
            layer.bindPopup(popupContent2)
        },
        //Implantation de l'icone
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: iconObserve });
        }
    }).addTo(map)
}

//Importation et utilisation des icons pour les points
var iconObserve = L.divIcon({
    class: 'icon',
    html: '<img src="Images/Icones/binocular.svg" alt="" />',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

var iconPerdu = L.divIcon({
    class: 'icon',
    html: '<img src="Images/Icones/questionmark.svg" alt="" />',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});


//creation de layer group pour le layer control
var chienPerduGroup = L.layerGroup([chienPerdulayer["Chien perdu"]]);
var chienObserveGroup = L.layerGroup([chienObserveLayer["Chien observé"]]);
var arrondissementGroup = L.layerGroup([arrondissementLayer["Arrondissement"]]);


//Layer Groups and Layers Control
var baseMaps = {
    'Open Street Map': osm,
    'CyclOSM': CyclOSM,
    'Esri World Imagery': EsriWorldImagery
};

var overlays = {
    "Chien perdu": chienPerduGroup,
    "Chien observé": chienObserveGroup,
    "Arrondissement": arrondissementGroup
};

L.control.layers(baseMaps, overlays).addTo(map);

//Plugins supplémentaire

//ajout de la légende
L.control.Legend({
    position: "bottomleft",
    legends: [{
        label: "Chien perdu",
        type: "image",
        url: "Images/Icones/questionmark.svg",
    }, 
    {
        label: "Chien obervé",
        type: "image",
        url: "Images/Icones/binocular.svg"
    }]
}).addTo(map);

//ajout des crédits
credits = L.controlCredits({
    imageurl: './Images/Logo_Cegep.png',
    imagealt: 'Logo cégep Limoilou',
    tooltip: 'Fait par le Département de la géomatique',
    width: '80px',
    height: '45px',
    expandcontent: 'Carte interactive<br/>Par <a href="https://www.cegeplimoilou.ca/" target="_blank">Cégep Limoilou</a>',
}).addTo(map);