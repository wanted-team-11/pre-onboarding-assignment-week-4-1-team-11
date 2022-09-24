import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { UserProps } from "../../types/user";
import {
  FetchAccountProps,
  FetchUserSettingProps,
  FetchUsersProps,
} from "../models/user";

type Props = {
  query: string;
  pageNumber: string;
};

const FETCH_URL = {
  USERS: ({ query, pageNumber }: Props) =>
    `/users?q=${query}&_page=${pageNumber}&_limit=20`,
  USER_SETTING: "/userSetting",
  ACCOUNTS: "/accounts",
};

const fetchSearchUserList = async ({ query, pageNumber }: Props) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: users, headers } = await instance.get<FetchUsersProps[]>(
    FETCH_URL.USERS({ query, pageNumber })
  );

  const { data: userSettings } = await instance.get<FetchUserSettingProps[]>(
    FETCH_URL.USER_SETTING
  );
  const { data: accounts } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS
  );

  const userList = users.map((user) => {
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

  return { userList, totalCount: headers["x-total-count"] };
};

export { fetchSearchUserList };
