import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  repos: [],
  status: "idle",
  err: null,
};
export const fetchRepos = createAsyncThunk("repos/fetchRepos", async (user) => {
  let myResponse;
  await axios({
    method: "get",
    url: `https://api.github.com/users/${user}/repos`,
  }).then(function (response) {
    myResponse = response.data;
  });
  return myResponse;
});

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRepos.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchRepos.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.repos = action.payload;
    },
    [fetchRepos.rejected]: (state, action) => {
      state.status = "failed";
      state.repos = [];
      state.error = action.error.message;
    },
  },
});

export const selectAllRepos = (state) => state.repos.repos;

export default reposSlice.reducer;
