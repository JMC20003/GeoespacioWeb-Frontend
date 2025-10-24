import { Source, Layer } from 'react-map-gl/maplibre';
import { useSelector } from 'react-redux';

const layerStyle = {
  id: 'backend-features-fill',
  type: 'fill',
  paint: {
    'fill-color': '#007cbf',
    'fill-opacity': 0.5,
  },
};

const lineLayerStyle = {
    id: 'backend-features-line',
    type: 'line',
    paint: {
        'line-color': '#007cbf',
        'line-width': 2,
    },
};

const pointLayerStyle = {
    id: 'backend-features-point',
    type: 'circle',
    paint: {
        'circle-radius': 5,
        'circle-color': '#007cbf',
    },
};

export const BackendFeaturesLayer = ({ features }) => {
  const { featuresVisible } = useSelector((state) => state.mapReducer);

  if (!features || !featuresVisible) {
    return null;
  }

  return (
    <Source id="backend-data" type="geojson" data={features}>
      <Layer {...layerStyle} />
      <Layer {...lineLayerStyle} />
      <Layer {...pointLayerStyle} />
    </Source>
  );
};
