import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRefinedUserInfo } from "../services/api";
import { RefinedUserInfo } from "../types";

interface UserListState {
  userList: RefinedUserInfo[];
  userCount: number;
  isError: boolean;
  isLoading: boolean;
}

const initialState: UserListState = {
  userList: [],
  userCount: 0,
  isError: false,
  isLoading: false,
};

export const getRefinedUserInfoThunk = createAsyncThunk(
  "getRefinedUserInfoThunk",
  async ({
    pageNumber,
    limit,
    userName,
  }: {
    pageNumber?: number;
    limit?: number;
    userName?: string;
  }) => {
    return getRefinedUserInfo({ pageNumber, limit, userName });
  }
);

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRefinedUserInfoThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRefinedUserInfoThunk.fulfilled, (state, action) => {
      const { refinedUserInfo, totalCount, error } = action.payload;
      state.userList = refinedUserInfo ?? state.userList;
      state.userCount = totalCount ?? state.userCount;
      state.isError = !!error;
      state.isLoading = false;
    });
  },
});

export default userListSlice.reducer;
