import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { AccountListProps } from "../../types/user";
import { FetchAccountProps, FetchUsersProps } from "../models/user";

const FETCH_URL = {
  USERS: `/users`,
  ACCOUNTS: `/accounts`,
};

const fetchAccountList = async () => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: accounts } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS
  );

  const { data: users } = await instance.get<FetchUsersProps[]>(
    FETCH_URL.USERS
  );

  const accountList = accounts.map<AccountListProps>((account) => {
    return {
      ...account,
      broker_name: account.broker_id + "",
      user_name: users.find((user) => account.user_id === user.id)?.name || "",
    };
  });

  return accountList;
};

export { fetchAccountList };
