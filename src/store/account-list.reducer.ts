import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRefinedAccountsInfo } from "../services";
import { RefinedAccountInfo } from "../types";

interface AccountListState {
  accountList: RefinedAccountInfo[];
  accountCount: number;
  isError: boolean;
  isLoading: boolean;
}

const initialState: AccountListState = {
  accountList: [],
  accountCount: 0,
  isError: false,
  isLoading: false,
};

export const getRefinedAccountsInfoThunk = createAsyncThunk(
  "getRefinedAccountsInfoThunk",
  async ({ pageNumber = 1 }: { pageNumber: number }) => {
    return getRefinedAccountsInfo(pageNumber);
  }
);

export const userAccountSlice = createSlice({
  name: "userAccountSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRefinedAccountsInfoThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRefinedAccountsInfoThunk.fulfilled, (state, action) => {
      const { refinedAccounts, error, totalCount } = action.payload;
      state.accountList = refinedAccounts ?? state.accountList;
      state.accountCount = totalCount ?? state.accountCount;
      state.isError = !!error;
      state.isLoading = false;
    });
  },
});

export default userAccountSlice.reducer;
