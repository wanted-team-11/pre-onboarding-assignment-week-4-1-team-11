import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchAccountList } from "../api/fetchAccountList";
import { brokerKeyType } from "../models/statics";
import useRefine from "./useRefine";

const useAccountsQuery = () => {
  const { refineName, refineDate, refineTel, refineBrokerId } = useRefine();

  const { data: accountList, ...queryResult } = useQuery(
    ["getAccounts"],
    fetchAccountList,
    {
      select: (accountList) => {
        return accountList.map((account) => ({
          ...account,
          user_name: refineName(account.user_name),
          broker_name: refineBrokerId(account.broker_name as brokerKeyType),
        }));
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
    accountList,
  };
};

export { useAccountsQuery };
