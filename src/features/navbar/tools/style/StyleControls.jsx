
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColorPicker from './ColorPicker';
import SizeSlider from './SizeSlider';
import { setFillColor, setLineColor, setPointColor, setLineWidth, setPointSize } from '@/shared/redux/features/styleSlice';

const StyleControls = () => {
  const dispatch = useDispatch();
  const { fillColor, lineColor, pointColor, lineWidth, pointSize } = useSelector((state) => state.styleReducer);

  return (
    <div className="flex items-center gap-4 p-2 bg-white">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Relleno</span>
        <ColorPicker color={fillColor} onChange={(color) => dispatch(setFillColor(color))} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Línea</span>
        <ColorPicker color={lineColor} onChange={(color) => dispatch(setLineColor(color))} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Ancho</span>
        <SizeSlider size={lineWidth} min={1} max={10} onChange={(size) => dispatch(setLineWidth(size))} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Punto</span>
        <ColorPicker color={pointColor} onChange={(color) => dispatch(setPointColor(color))} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Tamaño</span>
        <SizeSlider size={pointSize} min={1} max={15} onChange={(size) => dispatch(setPointSize(size))} />
      </div>
    </div>
  );
};

export default StyleControls;
