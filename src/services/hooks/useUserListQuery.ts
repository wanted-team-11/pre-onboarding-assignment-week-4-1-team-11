import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchUserList } from "../api/fetchUserList";
import { QUERY_KEY } from "../models/queryKeys";
import useRefine from "./useRefine";

const useUserListQuery = (pageNumber: string) => {
  const { refineName, refineDate, refineTel } = useRefine();

  const { data, ...queryResult } = useQuery(
    [QUERY_KEY.GET_USER_LIST, pageNumber],
    () => fetchUserList(pageNumber),
    {
      select: ({ userList, totalUserCount }) => {
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
          totalUserCount,
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
    totalUserCount: data?.totalUserCount,
  };
};

export { useUserListQuery };
