import { Source, Layer } from 'react-map-gl/maplibre';
import { useSelector } from 'react-redux';

const lineLayerStyle = {
    id: 'backend-lineas-line',
    type: 'line',
    paint: {
        'line-color': '#007cbf',
        'line-width': 2,
    },
};

export const BackendLineasLayer = () => {
  const { backendLineas, lineasVisible } = useSelector((state) => state.mapReducer);

  if (!backendLineas || !lineasVisible) {
    return null;
  }

  // Map the backend response to a GeoJSON FeatureCollection
  const geoJsonData = {
    type: "FeatureCollection",
    features: backendLineas.map(l => ({
      ...l.feature, // Spread the GeoJSON Feature
      id: l.id // Override or add the database ID
    }))
  };

  return (
    <Source id="backend-lineas-data" type="geojson" data={geoJsonData}>
      <Layer {...lineLayerStyle} />
    </Source>
  );
};
