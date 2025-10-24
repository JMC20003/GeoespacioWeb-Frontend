import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useDrawingManager = () => {
  const { drawingMode, mapBoxDrawStateRef } = useSelector((state) => state.mapReducer);

  useEffect(() => {
    if (mapBoxDrawStateRef && drawingMode) {
      mapBoxDrawStateRef.changeMode(drawingMode);
    }
  }, [drawingMode, mapBoxDrawStateRef]);
};
