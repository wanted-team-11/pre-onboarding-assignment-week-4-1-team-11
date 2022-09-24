import axios from 'axios';
import { tokenStorage, StorageKey } from '../../storage';
import { FetchAccountProps, FetchUsersProps } from '../models/user';

const FETCH_URL = {
  USERS: (userId: string) => `/users/${userId}`,
  ACCOUNTS: (userId: string) => `/accounts?user_id=${userId}`,
};

const fetchUserDetail = async (userId: string) => {
  const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

  if (!accessToken) throw Error('no token');

  const instance = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: user } = await instance.get<FetchUsersProps>(
    FETCH_URL.USERS(userId),
  );

  const { data: accounts } = await instance.get<FetchAccountProps[]>(
    FETCH_URL.ACCOUNTS(userId),
  );

  return { user, accounts };
};

export { fetchUserDetail };
