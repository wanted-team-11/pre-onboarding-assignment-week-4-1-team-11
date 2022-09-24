import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRefinedAccountsInfo,
  getRefinedAccountInfo,
  changeAccountName,
} from "../services";
import { Account, RefinedAccountInfo } from "../types";

interface AccountListState {
  accountList: RefinedAccountInfo[];
  accountDetail: RefinedAccountInfo | null;
  accountCount: number;
  isError: boolean;
  isLoading: boolean;
}

const initialState: AccountListState = {
  accountList: [],
  accountDetail: null,
  accountCount: 0,
  isError: false,
  isLoading: false,
};

export const putAccountWithNewNameThunk = createAsyncThunk(
  "putAccountWithNewNameThunk",
  async ({
    userId,
    id,
    newAccount,
  }: {
    userId: number;
    id: number;
    newAccount: Account;
  }) => {
    return changeAccountName({ userId, id, newAccount });
  }
);

export const getRefinedAccountInfoThunk = createAsyncThunk(
  "getRefinedAccountInfoThunk",
  async ({ userId, id }: { userId: number; id: number }) => {
    return getRefinedAccountInfo(userId, id);
  }
);

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

    builder.addCase(getRefinedAccountInfoThunk.pending, (state) => {
      state.isLoading = true;
      state.accountDetail = null;
    });
    builder.addCase(getRefinedAccountInfoThunk.fulfilled, (state, action) => {
      const { refinedAccountInfo, error } = action.payload;
      state.accountDetail = refinedAccountInfo;
      state.isError = !!error;
      state.isLoading = false;
    });

    builder.addCase(putAccountWithNewNameThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(putAccountWithNewNameThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export default userAccountSlice.reducer;
