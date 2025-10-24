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
import { useDrawingManager } from '@/shared/hooks/useDrawingManager';

export const MapContainer = () => {
    const dispatch = useDispatch()
    const { backendFeatures } = useSelector((state) => state.mapReducer);
    const { Lineas } = useSelector((state) => state.mapReducer);
    const { Puntos } = useSelector((state) => state.mapReducer);
    const { Zonas } = useSelector((state) => state.mapReducer);

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
        mapCanvas.classList.remove("cursor-crosshair", "cursor-pointer-icon");
        mapCanvas.classList.add("cursor-pointer-icon");
        break;
      default:
        mapCanvas.classList.remove("cursor-crosshair", "cursor-pointer-icon");
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
        >  
          <BackendFeaturesLayer features={backendFeatures} />
          <BackendPuntosLayer features={Puntos}/>
          <BackendLineasLayer features={Lineas}/>
          <BackendZonasLayer features={Zonas}/>
          <DrawControl position="top-left" modeChange={modeChange}/>
          <NavigationControl position='top-left' />
          <ScaleControl position='bottom-left' maxWidth={100} unit='metric'/>
          <CustomLayers />
        </Map>
  )
}
