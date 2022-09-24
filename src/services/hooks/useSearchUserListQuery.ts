import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import { fetchSearchUserList } from '../api/fetchSearchUserList';
import useRefine from './useRefine';

type Props = {
  query: string;
  pageNumber: string;
};

const useSearchUserListQuery = ({ query, pageNumber }: Props) => {
  const { refineName, refineDate, refineTel } = useRefine();

  const { data, ...queryResult } = useQuery(
    ['getUserList', pageNumber, query],
    () => fetchSearchUserList({ query, pageNumber }),
    {
      select: ({ userList, totalCount }) => {
        return {
          userList: userList.map((user) => {
            return {
              ...user,
              name: refineName(user.name),
              birth_date: refineDate(user.birth_date),
              phone_number: refineTel(user.phone_number),
              last_login: refineDate(user.last_login),
              created_at: refineDate(user.created_at),
            };
          }),
          totalCount,
        };
      },
      onError: (err) => {
        Modal.error({
          title: 'error',
          content: `${err}`,
        });
      },
    },
  );
  return {
    ...queryResult,
    userList: data?.userList,
    totalCount: data?.totalCount,
  };
};

export { useSearchUserListQuery };
