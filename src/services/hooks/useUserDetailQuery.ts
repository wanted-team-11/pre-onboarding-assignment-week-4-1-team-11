import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { UserDetailProps } from "../../types/user";
import { fetchUserDetail } from "../api/fetchUserDetail";
import useRefine from "./useRefine";

const useUserDetailQuery = (userId: string) => {
  const { refineName, refineDate, refineTel, refineBrokerId } = useRefine();

  const { data: userDetail, ...queryResult } = useQuery(
    ["getUserDetail", userId],
    () => fetchUserDetail(userId),
    {
      select: ({ user, accounts }): UserDetailProps => {
        return {
          user: {
            photo: user.photo,
            email: user.email,
            age: user.age,
            gender_origin: user.gender_origin,
            address: user.address,
            detail_address: user.detail_address,
            name: refineName(user.name),
            birth_date: refineDate(user.birth_date),
            phone_number: refineTel(user.phone_number),
            last_login: refineDate(user.last_login),
            created_at: refineDate(user.created_at),
            updated_at: refineDate(user.updated_at),
          },
          accounts: accounts.map((account) => ({
            name: account.name,
            broker_name: refineBrokerId(account.broker_id),
          })),
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
