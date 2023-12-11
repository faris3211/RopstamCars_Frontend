import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccessMessage, showErrorMessage } from './helpers';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from './localStorage';
import {
  signUpUserThunk,
  signInUserThunk,
  fetchDashboardDetailsThunk,
  addCarCategoryThunk,
  fetchCarCategoriesThunk,
  editCarCategoryThunk,
  removeCarCategoryThunk,
  addCarThunk,
  fetchCarsByUserThunk,
  editCarThunk,
  removeCarThunk,
} from './marketplaceThunks';

const initialState = {
  user: getUserFromLocalStorage(),
  carCategories: [],
  cars: [],
  systemTotalCarsByCategory: null,
  myTotalCarsByCategory: null,
};

export const signUpUser = createAsyncThunk(
  'marketplace/signUpUser',
  signUpUserThunk
);

export const signInUser = createAsyncThunk(
  'marketplace/signInUser',
  signInUserThunk
);

export const fetchDashboardDetails = createAsyncThunk(
  'marketplace/fetchDashboardDetails',
  fetchDashboardDetailsThunk
);

export const addCarCategory = createAsyncThunk(
  'marketplace/addCarCategory',
  addCarCategoryThunk
);

export const fetchCarCategories = createAsyncThunk(
  'marketplace/fetchCarCategories',
  fetchCarCategoriesThunk
);

export const editCarCategory = createAsyncThunk(
  'marketplace/editCarCategory',
  editCarCategoryThunk
);

export const removeCarCategory = createAsyncThunk(
  'marketplace/removeCarCategory',
  removeCarCategoryThunk
);

export const addCar = createAsyncThunk('marketplace/addCar', addCarThunk);

export const fetchCarsByUser = createAsyncThunk(
  'marketplace/fetchCarsByUser',
  fetchCarsByUserThunk
);

export const editCar = createAsyncThunk('marketplace/editCar', editCarThunk);

export const removeCar = createAsyncThunk(
  'marketplace/removeCar',
  removeCarThunk
);

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.carCategories = null;
      state.cars = null;
      state.systemTotalCarsByCategory = null;
      state.myTotalCarsByCategory = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    // User

    builder.addCase(signUpUser.pending, (state) => {});
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      showSuccessMessage(payload.message);
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(signInUser.pending, (state) => {});
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      addUserToLocalStorage({ ...payload.user });
      state.user = { ...payload.user };
      showSuccessMessage(payload.message);
    });
    builder.addCase(signInUser.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(fetchDashboardDetails.pending, (state) => {});
    builder.addCase(fetchDashboardDetails.fulfilled, (state, { payload }) => {
      state.systemTotalCarsByCategory = payload.systemTotalCarsByCategory.map(
        (carsByCategory) => {
          return {
            label: carsByCategory._id.toUpperCase(),
            value: carsByCategory.count,
          };
        }
      );

      state.myTotalCarsByCategory = payload.myTotalCarsByCategory.map(
        (carsByCategory) => {
          return {
            label: carsByCategory._id.toUpperCase(),
            value: carsByCategory.count,
          };
        }
      );
    });
    builder.addCase(fetchDashboardDetails.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    // Car Category

    builder.addCase(addCarCategory.pending, (state) => {});
    builder.addCase(addCarCategory.fulfilled, (state, { payload }) => {
      state.carCategories = payload.carCategories;
      showSuccessMessage(payload.message);
    });
    builder.addCase(addCarCategory.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(fetchCarCategories.pending, (state) => {});
    builder.addCase(fetchCarCategories.fulfilled, (state, { payload }) => {
      state.carCategories = payload.carCategories;
    });
    builder.addCase(fetchCarCategories.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(editCarCategory.pending, (state) => {});
    builder.addCase(editCarCategory.fulfilled, (state, { payload }) => {
      state.carCategories = payload.carCategories;
      showSuccessMessage(payload.message);
    });
    builder.addCase(editCarCategory.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(removeCarCategory.pending, (state) => {});
    builder.addCase(removeCarCategory.fulfilled, (state, { payload }) => {
      state.carCategories = payload.carCategories;
      showSuccessMessage(payload.message);
    });
    builder.addCase(removeCarCategory.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    // Car

    builder.addCase(addCar.pending, (state) => {});
    builder.addCase(addCar.fulfilled, (state, { payload }) => {
      state.cars = [...state.cars, payload.car];
      showSuccessMessage(payload.message);
    });
    builder.addCase(addCar.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(fetchCarsByUser.pending, (state) => {});
    builder.addCase(fetchCarsByUser.fulfilled, (state, { payload }) => {
      state.cars = payload.cars;
    });
    builder.addCase(fetchCarsByUser.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(editCar.pending, (state) => {});
    builder.addCase(editCar.fulfilled, (state, { payload }) => {
      state.cars = state.cars.map((car) => {
        if (car._id === payload.car._id) {
          return payload.car;
        } else {
          return car;
        }
      });
      showSuccessMessage(payload.message);
    });
    builder.addCase(editCar.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });

    builder.addCase(removeCar.pending, (state) => {});
    builder.addCase(removeCar.fulfilled, (state, { payload }) => {
      state.cars = state.cars.filter(
        (car) => car._id !== payload.car._id && car
      );
      showSuccessMessage(payload.message);
    });
    builder.addCase(removeCar.rejected, (state, { payload }) => {
      showErrorMessage(payload.message);
    });
  },
});

export const { signOut } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
