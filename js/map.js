import {activateForm, disactivateForm} from './form_activation_toggle.js';
import {newObject} from './data.js';
import {similarNotices} from './similarEl.js';

activateForm();

const DEFAULT_POSITION = {
  lat: 35.68948,
  lng: 139.69170,
};

const MARKER_STYLE = {
  iconUrl: './img/pin.svg',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
};

const MAIN_MARKER_STYLE = {
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView(DEFAULT_POSITION, 13);

L.tileLayer(
  MAP_TILE_LAYER,
  {
    attribution: MAP_COPYRIGHT
  },)
  .addTo(map);

const mainPinIcon = L.icon(MAIN_MARKER_STYLE);
const mainPinMarker = L.marker(
  DEFAULT_POSITION,
  {
    draggable: true,
    icon: mainPinIcon
  }
);
mainPinMarker.addTo(map);

const createMarker = (point, layer, icon) => {
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(layer)
    .bindPopup(newObject(point));
};

const addressField = document.querySelector('#address');

const setCoordinate = ({lat, lng}) => {
  const latData = parseFloat(lat).toFixed(5);
  const lngData = parseFloat(lng).toFixed(5);

  addressField.value = `${latData}, ${lngData}`;
};


mainPinMarker.on('moveend', ({target}) => {
  setCoordinate(target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);
const pinIcon = L.icon(MARKER_STYLE);
const AdList = similarNotices;

AdList.forEach((advert) => {
  createMarker(advert, markerGroup, pinIcon);
});
