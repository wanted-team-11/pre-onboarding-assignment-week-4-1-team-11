import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { AccountProps, UserDetailProps } from "../../types/user";
import { fetchAccountDetail } from "../api/fetchAccountDetail";
import useRefine from "./useRefine";

const useAccountDetailQuery = (accountNumber: string) => {
  const { refineDate, refineName, refineBrokerId } = useRefine();

  const { data: accountDetail, ...queryResult } = useQuery(
    ["getAccountDetail", accountNumber],
    () => fetchAccountDetail(accountNumber),
    {
      select: (account): AccountProps => {
        return {
          ...account,
          broker_name: refineBrokerId(account.broker_id),
          user_name: refineName(account.user_name),
          updated_at: refineDate(account.updated_at),
          created_at: refineDate(account.created_at),
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
    accountDetail,
  };
};

export { useAccountDetailQuery };
