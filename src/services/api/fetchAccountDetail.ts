import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { FetchAccountProps, FetchUsersProps } from "../models/user";

const FETCH_URL = {
  USERS: (userId: string) => `/users?id=${userId}`,
  ACCOUNTS: (accountNumber: string) => `/accounts?number=${accountNumber}`,
};

const fetchAccountDetail = async (accountNumber: string) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: account } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS(accountNumber)
  );

  const { data: user } = await instance.get<FetchUsersProps[]>(
    FETCH_URL.USERS(account[0].user_id + "")
  );

  return { ...account[0], user_name: user[0].name };
};

export { fetchAccountDetail };
