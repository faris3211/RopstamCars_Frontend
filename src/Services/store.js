import { configureStore } from '@reduxjs/toolkit';
import marketplaceReducer from './marketplaceSlice';

const store = configureStore({
  reducer: {
    marketplace: marketplaceReducer,
  },
  devTools: true,
});

export default store;
