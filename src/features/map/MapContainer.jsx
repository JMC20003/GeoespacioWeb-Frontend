import { useEffect, useRef } from 'react'
import Map from 'react-map-gl/maplibre';
import mapLibregl from 'maplibre-gl';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationControl, ScaleControl } from 'react-map-gl';

//components
import { setMapref } from '@/shared/redux/features/mapSlice';
import { useGlobalState } from '@/shared/context/GlobalState';
import  DrawControl  from './components/toolbox/Toolbar'
import { CustomLayers } from './components/layers/CustomLayers';
import { BackendFeaturesLayer } from './components/BackendFeaturesLayer';
import { BackendPuntosLayer } from './components/BackendPuntosLayer';
import { BackendLineasLayer } from './components/BackendLineasLayer';
import { BackendZonasLayer } from './components/BackendZonasLayer';
import puntoAcceso from '@/shared/assets/svg/tab_edit/punto_acceso.svg';
import { useDrawingManager } from '@/shared/hooks/useDrawingManager';
import { getFeatureById } from '../map/services/featureAPI';
import { setSelectedFeature, clearSelectedFeature } from '@/shared/redux/features/selectedFeatureSlice';
import { setActiveTab } from '@/shared/redux/features/mapSlice';

export const MapContainer = () => {
    const dispatch = useDispatch()
    const { backendFeatures } = useSelector((state) => state.mapReducer);
    const { Lineas } = useSelector((state) => state.mapReducer);
    const { Puntos } = useSelector((state) => state.mapReducer);
    const { Zonas } = useSelector((state) => state.mapReducer);
    const { selectedFeatureData } = useSelector((state) => state.selectedFeatureReducer);

    useDrawingManager();

    const INITIAL_POSITION = {
        latitude: -12.020545729298373,
        longitude: -77.0269319335112,
    }
    const ZOOM = 9;
    const mapRef = useRef(null);

    const {mapType} = useGlobalState()
    
    const onLoad = () => {
      dispatch(setMapref(mapRef.current))    
      if (mapRef.current){
        mapRef.current.setSprite('https://geosolution.ddns.net/web/pangeaco/sprites/sprite_cto_divicau')
        mapRef.current.setSprite('https://geosolution.ddns.net/web/pangeaco/sprites/sprite_empalme')
        mapRef.current.setSprite('https://geosolution.ddns.net/web/pangeaco/sprites/sprite_site_holder')
      }
    }

    useEffect(()=>{
      if (mapRef.current){
        mapRef.current.setSprite('https://geosolution.ddns.net/web/pangeaco/sprites/sprite_cto_divicau')
         mapRef.current.setSprite('https://geosolution.ddns.net/web/pangeaco/sprites/sprite_empalme')
         mapRef.current.setSprite('https://geosolution.ddns.net/web/pangeaco/sprites/sprite_site_holder')
      }
    },[mapType])


    const onStyleData = (e) => {

    };


  const modeChange = (event) => {
    const mapCanvas = mapRef.current.getCanvas();
    switch(event.mode){
      case 'direct_select':
        mapCanvas.style.cursor = 'pointer';
        break;
      case 'draw_polygon':
      case 'draw_line_string':
      case 'draw_point':
      case 'draw_circle':
      case 'draw_rectangle':
      case 'draw_freehand':
        mapCanvas.style.cursor = 'crosshair';
        break;
      default:
        mapCanvas.style.cursor = '';
    }
  };

  const onClick = async (event) => {
    console.log("Map click event:", event);
    const feature = event.features && event.features[0];
    console.log("Clicked feature:", feature);
    if (feature) {
      console.log("Feature source:", feature.source);
      console.log("Feature properties:", feature.properties);
      console.log("Feature ID from properties:", feature.properties && feature.properties.id);
    }

    if (feature && feature.source === 'backend-data' && feature.id) {
      try {
        const response = await getFeatureById(feature.id);
        dispatch(setSelectedFeature({ id: feature.id, data: response.data }));
        dispatch(setActiveTab('selección'));
      } catch (error) {
        console.error("Error fetching feature details:", error);
        dispatch(clearSelectedFeature());
      }
    } else {
      dispatch(clearSelectedFeature());
    }
  };

  const handleDrawCreate = (event) => {
    console.log("Feature created:", event.features[0]);
    if (mapRef.current) {
      const style = mapRef.current.getStyle();
      const drawLayers = style.layers.filter(layer => layer.id.startsWith('gl-draw-'));
      console.log("MapboxDraw related layers after creation:", drawLayers);
    }
  };
    
  return (
        <Map
            ref={mapRef}    
            onLoad={onLoad}
            onStyleData={onStyleData}
            attributionControl={false}
            initialViewState={{longitude: INITIAL_POSITION.longitude, latitude: INITIAL_POSITION.latitude, zoom: ZOOM}}
            mapLib={mapLibregl}  interactive={true}
            mapStyle={mapType.source}
            style={{width: '100dvw', height: '100dvh'}}
            preserveDrawingBuffer={true}
            onClick={onClick}
            onMouseEnter={() => mapRef.current.getCanvas().style.cursor = 'pointer'}
            onMouseLeave={() => mapRef.current.getCanvas().style.cursor = ''}
            interactiveLayerIds={['backend-features-fill', 'backend-features-line', 'backend-features-point']}
        >  
          <BackendFeaturesLayer features={backendFeatures} />
          <BackendPuntosLayer features={Puntos}/>
          <BackendLineasLayer features={Lineas}/>
          <BackendZonasLayer features={Zonas}/>
          <DrawControl position="top-left" modeChange={modeChange} onCreate={handleDrawCreate}/>
          <NavigationControl position='top-left' />
          <ScaleControl position='bottom-left' maxWidth={100} unit='metric'/>
          <CustomLayers />
        </Map>
  )
}
