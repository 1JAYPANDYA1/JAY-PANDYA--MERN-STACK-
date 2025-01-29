import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const loginUser = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', data,{withCredentials:true});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logOutUser = createAsyncThunk(
  'auth/logOutUser', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchUserData = createAsyncThunk("auth/fetchUserData", async () => {
  try {
    console.log("fetching")
    const response = await axios.post("http://localhost:5000/api/auth/getUser",{},{withCredentials:true});
    return response.data;
  } catch (error) {
    if(error.response.data.message==="Unauthorized: No token provided"){
            window.location.href = "/login"
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateUser=createAsyncThunk('auth/updateUser', async (data,{ rejectWithValue }) => {
  try {
    console.log("data is going : ",data)
    const response = await axios.post('http://localhost:5000/api/auth/updateUser',data,{withCredentials:true});
    return response.data;
  } catch (error) {
    console.log(error)
    if(error.response.data.message==="Unauthorized: No token provided"){
      window.location.href = "/login"
}
    return rejectWithValue(error.response.data);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, message: '', loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.message = action.payload.message;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default authSlice.reducer;
