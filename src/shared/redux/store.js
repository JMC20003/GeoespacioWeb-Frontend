import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "@/shared/redux/features/mapSlice"
import selectedFeatureReducer from "@/shared/redux/features/selectedFeatureSlice"
import styleReducer from "@/shared/redux/features/styleSlice"

export const store = configureStore({
  reducer: {
    mapReducer,
    selectedFeatureReducer,
    styleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});