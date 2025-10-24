import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeatures, getPuntos, getLineas, getZonas } from "@/features/map/services/featureAPI";

export const fetchBackendFeatures = createAsyncThunk(
  'map/fetchBackendFeatures',
  async () => {
    const response = await getFeatures();
    return response.data;
  }
);

export const fetchPuntos = createAsyncThunk(
  'map/fetchPuntos',
  async () => {
    const response = await getPuntos();
    return response.data;
  }
);

export const fetchLineas = createAsyncThunk(
  'map/fetchLineas',
  async () => {
    const response = await getLineas();
    return response.data;
  }
);

export const fetchZonas = createAsyncThunk(
  'map/fetchZonas',
  async () => {
    const response = await getZonas();
    return response.data;
  }
);

const initialState = {
  mapBoxDrawStateRef: null,
  mapRef: null,
  layerData: null,
  drawingMode: null,

  backendFeatures: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' for features
  error: null,
  featuresVisible: true,

  backendPuntos: null,
  puntosStatus: 'idle',
  puntosError: null,
  puntosVisible: true,

  backendLineas: null,
  lineasStatus: 'idle',
  lineasError: null,
  lineasVisible: true,

  backendZonas: null,
  zonasStatus: 'idle',
  zonasError: null,
  zonasVisible: true,
};

export const map_slice = createSlice({
  name: "map_slice",
  initialState,
  reducers: {
    setMapboxDrawRef: (state, action) => {
      state.mapBoxDrawStateRef = action.payload;
    },
    setMapref: (state, action) => {
      state.mapRef = action.payload;
    },
    setLayerData: (state, action) => {
      state.layerData = action.payload;
    },
    setDrawingMode: (state, action) => {
      state.drawingMode = action.payload;
    },
    toggleFeaturesVisibility: (state) => {
      state.featuresVisible = !state.featuresVisible;
    },
    togglePuntosVisibility: (state) => {
      state.puntosVisible = !state.puntosVisible;
    },
    toggleLineasVisibility: (state) => {
      state.lineasVisible = !state.lineasVisible;
    },
    toggleZonasVisibility: (state) => {
      state.zonasVisible = !state.zonasVisible;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackendFeatures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBackendFeatures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.backendFeatures = action.payload;
        state.featuresVisible = true; // Show features after successful load
      })
      .addCase(fetchBackendFeatures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPuntos.pending, (state) => {
        state.puntosStatus = 'loading';
      })
      .addCase(fetchPuntos.fulfilled, (state, action) => {
        state.puntosStatus = 'succeeded';
        state.backendPuntos = action.payload;
        state.puntosVisible = true;
      })
      .addCase(fetchPuntos.rejected, (state, action) => {
        state.puntosStatus = 'failed';
        state.puntosError = action.error.message;
      })
      .addCase(fetchLineas.pending, (state) => {
        state.lineasStatus = 'loading';
      })
      .addCase(fetchLineas.fulfilled, (state, action) => {
        state.lineasStatus = 'succeeded';
        state.backendLineas = action.payload;
        state.lineasVisible = true;
      })
      .addCase(fetchLineas.rejected, (state, action) => {
        state.lineasStatus = 'failed';
        state.lineasError = action.error.message;
      })
      .addCase(fetchZonas.pending, (state) => {
        state.zonasStatus = 'loading';
      })
      .addCase(fetchZonas.fulfilled, (state, action) => {
        state.zonasStatus = 'succeeded';
        state.backendZonas = action.payload;
        state.zonasVisible = true;
      })
      .addCase(fetchZonas.rejected, (state, action) => {
        state.zonasStatus = 'failed';
        state.zonasError = action.error.message;
      });
  },
});


export const {
  setMapboxDrawRef,
  setMapref,
  setLayerData,
  setDrawingMode,
  toggleFeaturesVisibility,
  togglePuntosVisibility,
  toggleLineasVisibility,
  toggleZonasVisibility,
} = map_slice.actions;

export default map_slice.reducer;