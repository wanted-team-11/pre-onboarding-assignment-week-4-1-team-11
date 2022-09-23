import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRefinedUserInfoList, getRefinedUserInfo } from "../services";
import { RefinedUserInfo } from "../types";

interface UserListState {
  userList: RefinedUserInfo[];
  userDetail: RefinedUserInfo | null;
  userCount: number;
  isError: boolean;
  isLoading: boolean;
}

const initialState: UserListState = {
  userList: [],
  userDetail: null,
  userCount: 0,
  isError: false,
  isLoading: false,
};

export const getRefinedUserInfoThunk = createAsyncThunk(
  "getRefinedUserInfoThunk",
  async (id: number) => {
    return getRefinedUserInfo(id);
  }
);

export const getRefinedUserInfoListThunk = createAsyncThunk(
  "getRefinedUserInfoListThunk",
  async ({
    pageNumber,
    limit,
    userName,
  }: {
    pageNumber?: number;
    limit?: number;
    userName?: string;
  }) => {
    return getRefinedUserInfoList({ pageNumber, limit, userName });
  }
);

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRefinedUserInfoListThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRefinedUserInfoListThunk.fulfilled, (state, action) => {
      const { refinedUserInfoList, totalCount, error } = action.payload;
      state.userList = refinedUserInfoList ?? state.userList;
      state.userCount = totalCount ?? state.userCount;
      state.isError = !!error;
      state.isLoading = false;
    });

    builder.addCase(getRefinedUserInfoThunk.pending, (state) => {
      state.userDetail = null;
      state.isLoading = true;
    });
    builder.addCase(getRefinedUserInfoThunk.fulfilled, (state, action) => {
      const { refinedUserInfo, error } = action.payload;
      state.userDetail = refinedUserInfo;
      state.isError = !!error;
      state.isLoading = false;
    });
  },
});

export default userListSlice.reducer;
