import axios from "axios";
import {
  Accounts,
  LoginInfo,
  ResponseLogin,
  User,
  UserList,
  UserSetting,
} from "../types/types";
import storage from "../utils/storage";

const Token = storage.get("TOKEN");
const nonAuthAxios = axios.create({
  headers: { "content-type": "application/json" },
});

const AuthAxios = axios.create({
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});

export const loginAxios = async (loginInfo: LoginInfo) => {
  try {
    const response = await nonAuthAxios.post<ResponseLogin>(
      "/login",
      loginInfo
    );
    storage.set({ key: "TOKEN", value: response.data.accessToken });
    storage.set({ key: "USER", value: response.data.user.email });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
    } else alert("other error");
  }
};

export const getUsers = async (page: number) => {
  try {
    const response = await AuthAxios.get<User[]>(
      `/users?_page=${page}&_limit=20`
    );
    return [...response.data];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
    } else alert("other error");
  }
};

export const getUserList = async () => {
  const { data: users } = await AuthAxios.get<User[]>("/users");
  const { data: userSettings } = await AuthAxios.get<UserSetting[]>(
    "/userSetting"
  );
  const { data: accounts } = await AuthAxios.get<Accounts[]>("/accounts");
  const userList = users.map<UserList>((user) => {
    return {
      name: user.name,
      email: user.email,
      birth_date: user.birth_date,
      phone_number: user.phone_number,
      last_login: user.last_login,
      created_at: user.created_at,
      account_count: accounts.reduce((acc, curr) => {
        if (curr.user_id === user.id) acc += 1;
        return acc;
      }, 0),
      allow_marketing_push: userSettings.find(
        (userSetting) => userSetting.uuid === user.uuid
      )?.allow_invest_push,
      is_active: userSettings.find(
        (userSetting) => userSetting.uuid === user.uuid
      )?.is_active,
    };
  });
  return userList;
};
export interface AccountList {
  user_name: string | undefined;
  broker_name: string;
  number: string;
  status: number;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
}
export const getAccountList = async () => {
  const { data: users } = await AuthAxios.get<User[]>("/users");
  // const { data: userSettings } = await AuthAxios.get<UserSetting[]>(
  //   "/userSetting"
  // );
  const { data: accounts } = await AuthAxios.get<Accounts[]>("/accounts");
  const accountList = accounts.map<AccountList>((account) => {
    return {
      user_name: users.find((user) => user.id === account.user_id)?.name,
      broker_name: account.broker_id,
      number: account.number,
      status: account.status,
      name: account.name,
      assets: account.assets,
      payments: account.payments,
      is_active: account.is_active,
      created_at: account.created_at,
    };
  });
  return accountList;
};
