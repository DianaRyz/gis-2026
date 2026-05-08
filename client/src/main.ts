import 'ol/ol.css';
import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { fromLonLat } from 'ol/proj';

const GEOSERVER_WMS = 'http://localhost:8080/geoserver/gis/wms';
const MAP_CENTER: [number, number] = [48.3595, 53.1184];
const MAP_ZOOM = 14;

const wmsLayer = (layerName: string) =>
  new ImageLayer({
    source: new ImageWMS({
      url: GEOSERVER_WMS,
      params: { LAYERS: layerName, TILED: true },
      ratio: 1,
      serverType: 'geoserver',
    }),
  });

new Map({
  target: 'map',
  layers: [
    new TileLayer({ source: new OSM() }),
    wmsLayer('gis:buildings'),
    wmsLayer('gis:roads'),
  ],
  view: new View({
    center: fromLonLat(MAP_CENTER),
    zoom: MAP_ZOOM,
  }),
});
