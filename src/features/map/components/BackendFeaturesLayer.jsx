import { Source, Layer } from 'react-map-gl/maplibre';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import puntoAcceso from '@/shared/assets/svg/tab_edit/punto_acceso.svg';
import { useMap } from 'react-map-gl/maplibre';

export const BackendFeaturesLayer = ({ features }) => {
  const dispatch = useDispatch();
  const { featuresVisible } = useSelector((state) => state.mapReducer);
  const { selectedFeatureId } = useSelector((state) => state.selectedFeatureReducer);
  const { fillColor, lineColor, pointColor, lineWidth, pointSize } = useSelector((state) => state.styleReducer);

  const selectedFeature = useMemo(() => {
    if (!features || !selectedFeatureId) {
      return null;
    }
    const found = features.features.find(f => f.id === selectedFeatureId);
    return found ? { type: 'FeatureCollection', features: [found] } : null;
  }, [features, selectedFeatureId]);

  if (!features || !featuresVisible) {
    return null;
  }

  const unselectedFeatures = {
    ...features,
    features: features.features.filter(f => f.id !== selectedFeatureId),
  };

  return (
    <>
      <Source id="backend-data" type="geojson" data={unselectedFeatures}>
        <Layer
          id="backend-features-fill"
          type="fill"
          filter={['==', '$type', 'Polygon']}
          paint={{
            'fill-color': fillColor,
            'fill-opacity': 0.5,
          }}
        />
        <Layer
          id="backend-features-line"
          type="line"
          paint={{
            'line-color': lineColor,
            'line-width': lineWidth,
          }}
        />
        <Layer
          id="backend-features-point"
          type="circle"
           paint={{
            'circle-color': pointColor,
            'circle-radius': pointSize,
          }}
        />
      </Source>
      {selectedFeature && (
        <Source id="selected-backend-feature" type="geojson" data={selectedFeature}>
          <Layer
            id="selected-backend-feature-fill"
            type="fill"
            filter={['==', '$type', 'Polygon']}
            paint={{
              'fill-color': '#d8904dff',
              'fill-opacity': 0.7,
            }}
          />
          <Layer
            id="selected-backend-feature-line"
            type="line"
            paint={{
              'line-color': '#d8904dff',
              'line-width': 5,
            }}
          />
          <Layer
            id="selected-backend-feature-point"
            type="circle"
            paint={{
              'circle-radius': 5,
              'circle-color': '#d8904dff',
            }}
          />
        </Source>
      )}
    </>
  );
};
