
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fillColor: '#76c751',
  lineColor: '#76c751',
  pointColor: '#76c751',
  lineWidth: 2,
  pointSize: 5,
};

const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    setFillColor: (state, action) => {
      state.fillColor = action.payload;
    },
    setLineColor: (state, action) => {
      state.lineColor = action.payload;
    },
    setPointColor: (state, action) => {
      state.pointColor = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    setPointSize: (state, action) => {
      state.pointSize = action.payload;
    },
  },
});

export const {
  setFillColor,
  setLineColor,
  setPointColor,
  setLineWidth,
  setPointSize,
} = styleSlice.actions;

export default styleSlice.reducer;
