import { Source, Layer } from 'react-map-gl/maplibre';
import { useSelector } from 'react-redux';

const pointLayerStyle = {
    id: 'backend-puntos-point',
    type: 'circle',
    paint: {
        'circle-radius': 5,
        'circle-color': '#007cbf',
    },
};

export const BackendPuntosLayer = () => {
  const { backendPuntos, puntosVisible } = useSelector((state) => state.mapReducer);

  if (!backendPuntos || !puntosVisible) {
    return null;
  }

  // Map the backend response to a GeoJSON FeatureCollection
  const geoJsonData = {
    type: "FeatureCollection",
    features: backendPuntos.map(p => ({
      ...p.feature, // Spread the GeoJSON Feature
      id: p.id // Override or add the database ID
    }))
  };

  return (
    <Source id="backend-puntos-data" type="geojson" data={geoJsonData}>
      <Layer {...pointLayerStyle} />
    </Source>
  );
};
