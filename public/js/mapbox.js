/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWNlbHlhdiIsImEiOiJja3Z3a20wMDljNnppMzBzN3lzMHNtMHk0In0.LV9mRnFbv8fmwHIZDGPUiA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/acelyav/ckvwlgi0m1ki615q98qrwmp1c',
    scrollZoom: false,
    //center: [-118.113491, 34.111745],
    zoom: 10,
    //interactive: false,
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 10,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds);
};
