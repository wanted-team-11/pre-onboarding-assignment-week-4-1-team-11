import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { PartialAccountProps } from "../../types/user";
import { fetchAccountDetail } from "../api/fetchAccountDetail";
import useRefine from "./useRefine";

const useAccountDetailQuery = (accountNumber: string) => {
  const {
    refineDate,
    refineName,
    refineBrokerId,
    refineAccountStatus,
    refineMoney,
    refineIsActive,
  } = useRefine();

  const { data: accountDetail, ...queryResult } = useQuery(
    ["getAccountDetail", accountNumber],
    () => fetchAccountDetail(accountNumber),
    {
      select: (account): PartialAccountProps => {
        return {
          user_name: refineName(account.user_name),
          broker_name: refineBrokerId(account.broker_id),
          number: refineName(account.number),
          name: account.name,
          is_active: refineIsActive(account.is_active),
          status: refineAccountStatus(account.status),
          assets: refineMoney(account.assets),
          payments: refineMoney(account.payments),
          created_at: refineDate(account.created_at),
          updated_at: refineDate(account.updated_at),
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
