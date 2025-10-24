import { Source, Layer } from 'react-map-gl/maplibre';
import { useSelector } from 'react-redux';

const layerStyle = {
  id: 'backend-zonas-fill',
  type: 'fill',
  paint: {
    'fill-color': '#007cbf',
    'fill-opacity': 0.5,
  },
};

const lineLayerStyle = {
    id: 'backend-zonas-line',
    type: 'line',
    paint: {
        'line-color': '#007cbf',
        'line-width': 2,
    },
};

export const BackendZonasLayer = () => {
  const { backendZonas, zonasVisible } = useSelector((state) => state.mapReducer);

  if (!backendZonas || !zonasVisible) {
    return null;
  }

  // Map the backend response to a GeoJSON FeatureCollection
  const geoJsonData = {
    type: "FeatureCollection",
    features: backendZonas.map(z => ({
      ...z.feature, // Spread the GeoJSON Feature
      id: z.id // Override or add the database ID
    }))
  };

  return (
    <Source id="backend-zonas-data" type="geojson" data={geoJsonData}>
      <Layer {...layerStyle} />
      <Layer {...lineLayerStyle} />
    </Source>
  );
};
