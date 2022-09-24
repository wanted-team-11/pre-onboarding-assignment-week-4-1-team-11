import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchFilterUserList } from "../api/fetchFilterUserLIst";
import { QUERY_KEY } from "../models/queryKeys";
import useRefine from "./useRefine";

type Props = {
  filter: string;
  pageNumber: string;
};

const useFilterUserListQuery = ({ filter, pageNumber }: Props) => {
  const { refineName, refineDate, refineTel } = useRefine();

  const { data, ...queryResult } = useQuery(
    [QUERY_KEY.GET_FILTER_USER_LIST, pageNumber, filter],
    () => fetchFilterUserList({ filter, pageNumber }),
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
          title: "error",
          content: `${err}`,
        });
      },
    }
  );
  return {
    ...queryResult,
    userList: data?.userList,
    totalCount: data?.totalCount,
  };
};

export { useFilterUserListQuery };
