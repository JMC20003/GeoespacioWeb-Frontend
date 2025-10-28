import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";

import RouteIndex from '@/app/routes/Index'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLayerData, fetchBackendFeatures } from "@/shared/redux/features/mapSlice";
import { getAllTables } from "@/shared/services/tableServices";
import { getGlobalStyle } from "@/features/map/services/styleAPI";
import { setFillColor, setLineColor, setPointColor, setLineWidth, setPointSize } from "@/shared/redux/features/styleSlice";

import { Toaster } from 'sonner';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const { refreshFeatures } = useSelector((state) => state.mapReducer);


  useEffect(() => {
    const initialLoad = async () => {
      try {
        const data = await getAllTables();
        dispatch(setLayerData(data.data));
        dispatch(fetchBackendFeatures());
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
      } finally {
        setIsLoading(true);
      }
    };

    initialLoad();
  }, []);

  useEffect(() => {
    const loadGlobalStyle = async () => {
      try {
        const style = await getGlobalStyle();
        if (style) {
          if (style.fillColor) dispatch(setFillColor(style.fillColor));
          if (style.lineColor) dispatch(setLineColor(style.lineColor));
          if (style.pointColor) dispatch(setPointColor(style.pointColor));
          if (style.lineWidth) dispatch(setLineWidth(style.lineWidth));
          if (style.pointSize) dispatch(setPointSize(style.pointSize));
        }
      } catch (error) {
        console.error("Error cargando estilos globales:", error);
      }
    };

    loadGlobalStyle();
  }, [dispatch]);

  useEffect(() => {
    if (refreshFeatures > 0) {
      dispatch(fetchBackendFeatures());
    }
  }, [refreshFeatures]);

  if(!isLoading) {
    return <></>
  }

  return (
    <>
      <Toaster richColors />
      <RouteIndex />
    </>
  )
}

export default App
