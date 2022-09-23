import axios from "axios";
import setupInterceptorsTo from "./interception";

const baseApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

const callApi = setupInterceptorsTo(baseApi);

export const UsersApi = async () => {
  const res = await callApi.get("/users");
  return res;
};

export const AccountApi = async () => {
  const res = await callApi.get("/accounts");
  return res;
};

export const enactUserList = async () => {
  const { data: users } = await callApi.get("/users");
  const { data: accounts } = await callApi.get("/accounts");
  const { data: userSettings } = await callApi.get("/userSetting");

  const userList = users.map((user: { uuid: string; id: number }) => {
    return {
      ...(userSettings.find(
        (setting: { uuid: string }) => setting.uuid === user.uuid
      ) || {
        allow_marketing_push: true,
        is_active: true,
        is_staff: true,
      }),
      account_count: accounts.filter(
        (account: { user_id: number; account: string }) =>
          account.user_id === user.id
      ).length,
      ...user,
    };
  });

  return userList;
};

export const UserSettingApi = async () => {
  const res = await callApi.get("/usersetting");
  return res;
};
