let platform = new H.service.Platform({
    'apikey': 'IrO8EYPlWIDGaDmBXtOeTKFCUh-OUp0MB858-WU63dE'
  });

//search for each specific location 
//landmarkGeocode reads name of landmark and search for this name
function landmarkGeocode() {
  let title = document.querySelector('h1').textContent;
  var geocoder = platform.getSearchService(),
      landmarkGeocodingParameters = {
        q: title,
        at: '0,0',
        limit: 1
      };

  geocoder.discover(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}



function showMap(result) {
    let location = result.items;
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
        zoom: 15,
        center: { lat: location[0].position.lat, lng: location[0].position.lng}
    });
    let marker = new H.map.Marker({lat: location[0].position.lat, lng: location[0].position.lng});
    map.addObject(marker);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode(); 