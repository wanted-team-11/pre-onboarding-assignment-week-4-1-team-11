import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchAccountList } from "../api/fetchAccountList";
import { brokerKeyType } from "../models/statics";
import useRefine from "./useRefine";

const useAccountsQuery = (pageNumber: number) => {
  const { refineName, refineDate, refineBrokerId } = useRefine();

  const { data, ...queryResult } = useQuery(
    ["getAccounts", pageNumber],
    () => fetchAccountList(pageNumber),
    {
      select: ({ accountList, totalAccountCount }) => {
        return {
          accountList: accountList.map((account) => ({
            ...account,
            created_at: refineDate(account.created_at),
            user_name: refineName(account.user_name),
            broker_name: refineBrokerId(account.broker_name as brokerKeyType),
          })),
          totalAccountCount,
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
    accountList: data?.accountList,
    totalAccountCount: data?.totalAccountCount,
  };
};

export { useAccountsQuery };
