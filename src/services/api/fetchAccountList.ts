import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { AccountProps } from "../../types/user";
import { FetchAccountProps, FetchUsersProps } from "../models/user";

const FETCH_URL = {
  USERS: `/users`,
  ACCOUNTS: (pageNumber: number) => `/accounts?_page=${pageNumber}&_limit=20`,
};

const fetchAccountList = async (pageNumber: number) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: accounts, headers } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS(pageNumber)
  );

  const { data: users } = await instance.get<FetchUsersProps[]>(
    FETCH_URL.USERS
  );

  const accountList = accounts.map<AccountProps>((account) => {
    return {
      ...account,
      status: account + "",
      broker_name: account.broker_id + "",
      user_name: users.find((user) => account.user_id === user.id)?.name || "",
    };
  });

  return { accountList, totalAccountCount: headers["x-total-count"] };
};

export { fetchAccountList };
