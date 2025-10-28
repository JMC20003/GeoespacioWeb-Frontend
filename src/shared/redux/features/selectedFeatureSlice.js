import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFeatureId: null,
  selectedFeatureData: null,
};

const selectedFeatureSlice = createSlice({
  name: 'selectedFeature',
  initialState,
  reducers: {
    setSelectedFeature: (state, action) => {
      state.selectedFeatureId = action.payload.id;
      state.selectedFeatureData = action.payload.data;
    },
    clearSelectedFeature: (state) => {
      state.selectedFeatureId = null;
      state.selectedFeatureData = null;
    },
  },
});

export const { setSelectedFeature, clearSelectedFeature } = selectedFeatureSlice.actions;
export default selectedFeatureSlice.reducer;
