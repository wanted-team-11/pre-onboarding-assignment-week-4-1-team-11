import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userListReducer from "./user-list.reducer";
import accountListReducer from "./account-list.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducer = combineReducers({
  userList: userListReducer,
  accountList: accountListReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
