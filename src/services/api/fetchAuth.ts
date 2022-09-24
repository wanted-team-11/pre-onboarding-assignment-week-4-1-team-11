import { Modal } from 'antd';
import axios, { AxiosError } from 'axios';
import { tokenStorage, StorageKey } from '../../storage';
import { LoginProps } from '../models/auth';

const fetchLogin = async (props: LoginProps) => {
  try {
    const {
      data: { accessToken },
    } = await axios.post('login', props);

    if (!accessToken) throw Error('no Token');

    tokenStorage.set(StorageKey.ACCESS_TOKEN, accessToken);

    return true;
  } catch (err) {
    Modal.error({
      title: 'error',
      content: err instanceof AxiosError ? err.response?.data : err,
    });
  }
};

export { fetchLogin };
