d3.json("../data/data.js", function(data) {

  var map = L.map('map', {
      center: L.latLng(37.8715, -122.2730),
      zoom: 14,
      scrollWheelZoom: false,
      // maxBounds: L.latLngBounds()
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://github.com/CartoDB/cartodb">CartoDB</a>',
    maxZoom: 20
  }).addTo(map);

  var markers = L.markerClusterGroup({
    maxClusterRadius: 120,
    iconCreateFunction: function (cluster) {
        var childCount = cluster.getChildCount();

      var c = ' marker-cluster-';
      if (childCount < 10) {
        c += 'small';
      } else if (childCount < 100) {
        c += 'medium';
      } else {
        c += 'large';
      }
  
      return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
    },
  });
      
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // var pedestrianMarkers = [];
  // var bikeMarkers = [];
  // var susVehicleMarkers = [];
  // var trafficMarkers = [];

  for (key in data) {
    var value = data[key];
    if (value.type == "1194") {
      var colorIcon = blueIcon
    } else {
      var colorIcon = greenIcon
    }
    var date = value.month + "/" + value.day + "/2020 " + value.hour + ":" + value.min + " " + value.tod
    var marker = L.marker(value.coordinates, {icon: colorIcon, title: date});
    var description = date;
    marker.bindPopup(description);

    // if (value.type == "Pedestrian Stop") {
    //   pedestrianMarkers.push(marker)
    // } else if (value.type == "Bicycle Stop") {
    //   bikeMarkers.push(marker)
    // } else if (value.type == "Suspicious Vehicle Stop") {
    //   susVehicleMarkers.push(marker)
    // } else {
    //   trafficMarkers.push(marker)
    // }

    markers.addLayer(marker);
  }

  map.addLayer(markers);

  // var pedestrianLayer = L.layerGroup(pedestrianMarkers);
  // var bikeLayer = L.layerGroup(bikeMarkers);
  // var susVehicleLayer = L.layerGroup(susVehicleMarkers);
  // var trafficLayer = L.layerGroup(trafficMarkers);

  // var overlays = {"Pedestrian Stop": pedestrianLayer, "Bicycle Stop": bikeLayer, "Suspicious Vehicle Stop": susVehicleLayer, "Traffic Stop": trafficLayer};

  // var options = {
  //   groupCheckboxes: true,
  //   collapsed: false
  // };

  // L.control.layers(null, overlays, options).addTo(map);

  map.invalidateSize();

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          types = ["Pedestrian Stop", "Other"],
          labels = ["https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png", "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png"];
      
      for (var i = 0; i < types.length; i++) {
          div.innerHTML +=
              " <img src="+ labels[i] +" height='41' width='25'> " + "<span style='font-size: 15px'>" + types[i] + "</span>" + "<br>";
      }
      return div;
  };

  legend.addTo(map);
})