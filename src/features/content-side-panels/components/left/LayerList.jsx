import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleVisibleLayer } from "./helper/handleVisibleLayer";
import { toggleLayerEntry } from "./helper/toggleLayerEntry";
import { useGlobalState } from "@/shared/context/GlobalState";
import LayerCategory from "./components/LayerCategory";
import { getLayerVisibility } from "./helper/getLayerVisibility";
import {
  fetchBackendFeatures,
  toggleFeaturesVisibility,
  fetchPuntos,
  togglePuntosVisibility,
  fetchLineas,
  toggleLineasVisibility,
  fetchZonas,
  toggleZonasVisibility,
} from "@/shared/redux/features/mapSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export const LayerList = () => {
  const dispatch = useDispatch();
  const mapRef = useSelector((s) => s.mapReducer.mapRef);
  const layerData = useSelector((s) => s.mapReducer.layerData);
  const { 
    status, featuresVisible, 
    puntosStatus, puntosVisible, 
    lineasStatus, lineasVisible, 
    zonasStatus, zonasVisible 
  } = useSelector((s) => s.mapReducer);

  const [currentZoom, setCurrentZoom] = useState(null);
  const [orderedLayers, setOrderedLayers] = useState([]);
  const { 
    setLayerViewControl, setLayerActiveGeoserver, layerActiveGeoserver, 
    setLayersTableDown
  } = useGlobalState();

  const handleFetchFeatures = () => {
    dispatch(fetchBackendFeatures());
  }

  const handleToggleFeaturesVisibility = () => {
    dispatch(toggleFeaturesVisibility());
  };

  const handleFetchPuntos = () => {
    dispatch(fetchPuntos());
  };

  const handleTogglePuntosVisibility = () => {
    dispatch(togglePuntosVisibility());
  };

  const handleFetchLineas = () => {
    dispatch(fetchLineas());
  };

  const handleToggleLineasVisibility = () => {
    dispatch(toggleLineasVisibility());
  };

  const handleFetchZonas = () => {
    dispatch(fetchZonas());
  };

  const handleToggleZonasVisibility = () => {
    dispatch(toggleZonasVisibility());
  };

  const grouped = useMemo(() => {
    return orderedLayers.reduce((acc, layer) => {
      acc[layer.schema] = acc[layer.schema] || [];
      acc[layer.schema].push(layer);
      return acc;
    }, {});
  }, [orderedLayers]);

  const [expandedCats, setExpandedCats] = useState({});

  useEffect(() => {
    if (!mapRef) return;
    const handleZoom = () => setCurrentZoom(mapRef.getZoom());
    mapRef.on("zoom", handleZoom);
    return () => mapRef.off("zoom", handleZoom);
  }, [mapRef]);

  useEffect(() => {
    if (layerData && JSON.stringify(layerData) !== JSON.stringify(orderedLayers)) {
      setOrderedLayers([...layerData]);
    }
  }, [layerData]);


  const toggleLayer = (layerId) => {
    handleVisibleLayer(layerId, mapRef, setLayerViewControl, layerData);
  };

  const toggleCategoryLayers = (category, layers) => {
    if (!mapRef) return;
    const allActive = layers.every((l) => getLayerVisibility(l.styles?.[0]?.id, mapRef));
    const shouldShow = !allActive;
    layers.forEach((layer) => {
      const styleId = layer.styles?.[0]?.id;
      if (!styleId) return;
      const isVisible = getLayerVisibility(styleId, mapRef);
      if (isVisible !== shouldShow)
        handleVisibleLayer(layer.table, mapRef, setLayerViewControl, layerData);
    });
  };

  const handleSelectLayer = (layer) => {
    const isVisible = getLayerVisibility(layer.styles[0].id, mapRef);
    if (!isVisible) return;
    setLayerActiveGeoserver((prev) => toggleLayerEntry(prev, layer));
  };

  const selectLayerTableDown = (layer) => {
    const isVisible = getLayerVisibility(layer.styles[0].id, mapRef);
    if (!isVisible) return;
    setLayersTableDown((prev) => toggleLayerEntry(prev, layer));
  }

  const toggleExpand = (category) => {
    setExpandedCats((prev) => ({
      ...prev,
      [category]: !(prev[category] ?? false),
    }));
  };

  return (
    <div className="p-2 w-full h-[60dvh] overflow-y-auto custom-scrollbar">
       {/* Contenedor de botón + ojito para Features */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={handleFetchFeatures}
          disabled={status === "loading"}
          className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {status === "loading" ? "Cargando Features..." : "Cargar Features"}
        </button>

        {/* Botón del ojito para Features */}  
        <button
          onClick={handleToggleFeaturesVisibility}
          className="ml-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
          title={featuresVisible ? "Ocultar Features" : "Mostrar Features"}
        >
          {featuresVisible ? (
            <FaEye className="text-blue-600 text-lg" />
          ) : (
            <FaEyeSlash className="text-gray-500 text-lg" />
          )}
        </button>
      </div>

      {/* Contenedor de botón + ojito para Puntos */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={handleFetchPuntos}
          disabled={puntosStatus === "loading"}
          className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {puntosStatus === "loading" ? "Cargando Puntos..." : "Cargar Puntos"}
        </button>

        {/* Botón del ojito para Puntos */}  
        <button
          onClick={handleTogglePuntosVisibility}
          className="ml-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
          title={puntosVisible ? "Ocultar Puntos" : "Mostrar Puntos"}
        >
          {puntosVisible ? (
            <FaEye className="text-blue-600 text-lg" />
          ) : (
            <FaEyeSlash className="text-gray-500 text-lg" />
          )}
        </button>
      </div>

      {/* Contenedor de botón + ojito para Líneas */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={handleFetchLineas}
          disabled={lineasStatus === "loading"}
          className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {lineasStatus === "loading" ? "Cargando Líneas..." : "Cargar Líneas"}
        </button>

        {/* Botón del ojito para Líneas */}  
        <button
          onClick={handleToggleLineasVisibility}
          className="ml-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
          title={lineasVisible ? "Ocultar Líneas" : "Mostrar Líneas"}
        >
          {lineasVisible ? (
            <FaEye className="text-blue-600 text-lg" />
          ) : (
            <FaEyeSlash className="text-gray-500 text-lg" />
          )}
        </button>
      </div>

      {/* Contenedor de botón + ojito para Zonas */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={handleFetchZonas}
          disabled={zonasStatus === "loading"}
          className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {zonasStatus === "loading" ? "Cargando Zonas..." : "Cargar Zonas"}
        </button>

        {/* Botón del ojito para Zonas */}  
        <button
          onClick={handleToggleZonasVisibility}
          className="ml-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
          title={zonasVisible ? "Ocultar Zonas" : "Mostrar Zonas"}
        >
          {zonasVisible ? (
            <FaEye className="text-blue-600 text-lg" />
          ) : (
            <FaEyeSlash className="text-gray-500 text-lg" />
          )}
        </button>
      </div>

      {Object.entries(grouped).map(([category, layers]) => (
        <LayerCategory
          key={category}
          category={category}
          layers={layers}
          currentZoom={currentZoom}
          expanded={expandedCats[category] ?? false}
          toggleExpand={toggleExpand}
          toggleCategoryLayers={toggleCategoryLayers}
          handleSelectLayer={handleSelectLayer}
          toggleLayer={toggleLayer}
          layerActiveGeoserver={layerActiveGeoserver}
          setOrderedLayers={setOrderedLayers}
          selectLayerTableDown={selectLayerTableDown}
        />
      ))}
    </div>
  );
};

