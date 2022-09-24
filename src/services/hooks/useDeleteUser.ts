import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { fetchDeleteUser } from '../api/fetchDeleteUser';
import { QUERY_KEY } from '../models/queryKeys';

const useDeleteQuery = () => {
  const queryClient = useQueryClient();

  const deleteUserQuery = useMutation(fetchDeleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_USER_LIST]);
    },
    onError: (err) => {
      Modal.error({
        title: 'error',
        content: `${err}`,
      });
    },
  }).mutate;
  return {
    deleteUserQuery,
  };
};

export { useDeleteQuery };
