import axios from 'axios';
import { tokenStorage, StorageKey } from '../../storage';
import { FetchAccountProps, FetchUsersProps } from '../models/user';

const FETCH_URL = {
  USERS: (userId: string) => `/users/${userId}`,
};

const fetchDeleteUser = async (userId: string) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error('no token');

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const response = await instance.delete<FetchUsersProps>(
    FETCH_URL.USERS(userId),
  );

  return response;
};

export { fetchDeleteUser };
