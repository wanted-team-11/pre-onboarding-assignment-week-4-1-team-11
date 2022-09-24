import axios from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { FetchUsersProps } from "../models/user";

const FETCH_URL = {
  USERS: (userId: number) => `/users/${userId}`,
};

const fetchUpdateUser = async ({
  id,
  newNamePayload,
}: {
  id: number;
  newNamePayload: { name: string };
}) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error("no token");

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const response = await instance.patch<FetchUsersProps>(
    FETCH_URL.USERS(id),
    newNamePayload
  );

  return response;
};

export { fetchUpdateUser };
