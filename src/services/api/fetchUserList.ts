import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { UserListProps } from "../../types/user";
import {
  FetchAccountProps,
  FetchUserSettingProps,
  FetchUsersProps,
} from "../models/user";

const FETCH_URL = {
  USERS: "/users",
  USER_SETTING: "/userSetting",
  ACCOUNTS: "/accounts",
};

const fetchUserList = async () => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: users } = await instance.get<FetchUsersProps[]>(
    FETCH_URL.USERS
  );
  const { data: userSettings } = await instance.get<FetchUserSettingProps[]>(
    FETCH_URL.USER_SETTING
  );
  const { data: accounts } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS
  );

  const userList = users.map<UserListProps>((user) => {
    return {
      ...(userSettings.find((setting) => setting.uuid === user.uuid) || {
        allow_marketing_push: false,
        is_active: false,
        is_staff: false,
      }),
      account_count: accounts.filter((account) => account.user_id === user.id)
        .length,
      ...user,
    };
  });

  return userList;
};

export { fetchUserList };
