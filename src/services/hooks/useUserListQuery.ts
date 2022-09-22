import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchUserList } from "../api/fetchUserList";
import useRefine from "./useRefine";

const useUserListQuery = () => {
  const { refineName, refineDate, refineTel } = useRefine();

  const { data: userList, ...queryResult } = useQuery(
    ["getUserList"],
    fetchUserList,
    {
      select: (userList) => {
        return userList.map((user) => {
          return {
            id: user.id,
            name: refineName(user.name),
            account_count: user.account_count,
            email: user.email,
            gender_origin: user.gender_origin,
            birth_date: refineDate(user.birth_date),
            phone_number: refineTel(user.phone_number),
            last_login: refineDate(user.last_login),
            created_at: refineDate(user.created_at),
            allow_marketing_push: user.allow_marketing_push,
            is_active: user.is_active,
            is_staff: user.is_staff,
          };
        });
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
    userList,
  };
};

export { useUserListQuery };
