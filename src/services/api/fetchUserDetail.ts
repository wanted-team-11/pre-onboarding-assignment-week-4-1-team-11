import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { FetchUsersProps } from "../models/user";

const FETCH_URL = {
  USERS: (userId: string) => `/users/${userId}`,
};

const fetchUserDetail = async (userId: string) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: user } = await instance.get<FetchUsersProps>(
    FETCH_URL.USERS(userId)
  );

  return user;
};

export { fetchUserDetail };
