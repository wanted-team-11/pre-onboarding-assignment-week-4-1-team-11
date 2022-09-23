import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchUserDetail } from "../api/fetchUserDetail";
import { FetchUsersProps } from "../models/user";
import useRefine from "./useRefine";

const useUserDetailQuery = (userId: string) => {
  const { refineName, refineDate, refineTel } = useRefine();

  const { data: userDetail, ...queryResult } = useQuery(
    ["getUserDetail", userId],
    () => fetchUserDetail(userId),
    {
      select: (userDetail): FetchUsersProps => {
        return {
          ...userDetail,
          name: refineName(userDetail.name),
          birth_date: refineDate(userDetail.birth_date),
          phone_number: refineTel(userDetail.phone_number),
          last_login: refineDate(userDetail.last_login),
          created_at: refineDate(userDetail.created_at),
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
    userDetail,
  };
};

export { useUserDetailQuery };
