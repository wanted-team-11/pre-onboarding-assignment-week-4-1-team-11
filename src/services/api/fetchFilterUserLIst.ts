import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { UserProps } from "../../types/user";
import {
  FetchAccountProps,
  FetchUserSettingProps,
  FetchUsersProps,
} from "../models/user";

type Props = {
  filter: string;
  pageNumber: string;
};

const FETCH_URL = {
  USERS: `/users`,
  USER_SETTING: ({ filter, pageNumber }: Props) => {
    return `/userSetting?_page=${pageNumber}&_limit=20${filter}`;
  },
  ACCOUNTS: "/accounts",
};

const fetchFilterUserList = async ({ filter, pageNumber }: Props) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: users } = await instance.get<FetchUsersProps[]>(
    FETCH_URL.USERS
  );

  const { data: userSettings, headers } = await instance.get<
    FetchUserSettingProps[]
  >(FETCH_URL.USER_SETTING({ filter, pageNumber }));
  const { data: accounts } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS
  );

  const userList = userSettings
    .filter((userSetting) =>
      users.some((user) => userSetting.uuid === user.uuid)
    )
    .map<UserProps>((userSetting) => {
      const user = users.find(
        (user) => userSetting.uuid === user.uuid
      ) as FetchUsersProps;
      return {
        ...userSetting,
        account_count: accounts.filter(
          (account) => account.user_id === user?.id
        ).length,
        ...user,
      };
    });

  return { userList, totalCount: headers["x-total-count"] };
};

export { fetchFilterUserList };
