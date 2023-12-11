import { publicTypeReq, privateTypeReq } from './axios';
import { checkStatus } from './helpers';

// User

export const signUpUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await publicTypeReq.post('/user/signupuser', user);

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const signInUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await publicTypeReq.post('/user/signinuser', user);

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const fetchDashboardDetailsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await privateTypeReq.get(
      `/user/fetchdashboarddetails/${userId}`
    );

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

// Car Category

export const addCarCategoryThunk = async (
  { userId, carCategory },
  thunkAPI
) => {
  try {
    const resp = await privateTypeReq.patch(
      `/carcategory/addcarcategory/${userId}`,
      { carCategory }
    );

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const fetchCarCategoriesThunk = async (userId, thunkAPI) => {
  try {
    const resp = await privateTypeReq.get(
      `/carcategory/fetchcarcategories/${userId}`
    );

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const editCarCategoryThunk = async (
  { userId, oldNameOfCarCategory, newNameOfCarCategory },
  thunkAPI
) => {
  try {
    const resp = await privateTypeReq.patch(
      `/carcategory/editcarcategory/${userId}`,
      { oldNameOfCarCategory, newNameOfCarCategory }
    );

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const removeCarCategoryThunk = async (
  { userId, carCategory },
  thunkAPI
) => {
  try {
    const resp = await privateTypeReq.patch(
      `/carcategory/removecarcategory/${userId}/${carCategory}`
    );

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

// Car

export const addCarThunk = async (car, thunkAPI) => {
  try {
    const resp = await privateTypeReq.post('/car/addcar', car);

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const fetchCarsByUserThunk = async (userId, thunkAPI) => {
  try {
    const resp = await privateTypeReq.get(`/car/fetchcarsbyuser/${userId}`);

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const editCarThunk = async ({ carId, update }, thunkAPI) => {
  try {
    const resp = await privateTypeReq.patch(`/car/editcar/${carId}`, update);

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};

export const removeCarThunk = async (carId, thunkAPI) => {
  try {
    const resp = await privateTypeReq.delete(`/car/removecar/${carId}`);

    if (checkStatus(resp)) {
      console.log('backend error');
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    console.log('frontend error');
    return thunkAPI.rejectWithValue({
      status: 'FAILURE',
      message: 'There is some error while proceeding your request',
      error: error.message,
    });
  }
};
