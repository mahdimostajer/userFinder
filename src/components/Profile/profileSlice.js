import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  status: "idle",
  err: null,
};
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (user) => {
    let myResponse
    await axios({
      method: "get",
      url: `https://api.github.com/users/${user}`,
    }).then(function (response) {
      myResponse= response.data;
    });
    return myResponse
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProfile.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchProfile.fulfilled]: (state, action) => {
        console.log(action.payload)
      state.status = "fulfilled";
      state.profile = action.payload;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.status = "failed";
      state.profile = null;
      state.error = action.error.message;
    },
  },
});

export const selectProfile = (state) => state.profile.profile;

export default profileSlice.reducer;
