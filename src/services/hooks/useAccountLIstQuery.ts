import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchAccountList } from "../api/fetchAccountList";
import {
  AccountStatusKeyType,
  BrokerFormatType,
  BrokerKeyType,
} from "../models/statics";
import useRefine from "./useRefine";

const useAccountListQuery = (pageNumber: number) => {
  const {
    refineName,
    refineDate,
    refineBrokerId,
    refineAccountStatus,
    refineAccountNumberFormat,
    refineAccountNumberMask,
  } = useRefine();

  const { data, ...queryResult } = useQuery(
    ["getAccounts", pageNumber],
    () => fetchAccountList(pageNumber),
    {
      select: ({ accountList, totalAccountCount }) => {
        return {
          accountList: accountList.map((account) => ({
            ...account,
            status: refineAccountStatus(account.status as AccountStatusKeyType),
            number: refineAccountNumberFormat(
              refineAccountNumberMask(account.number),
              account.broker_name as BrokerFormatType
            ),
            created_at: refineDate(account.created_at),
            user_name: refineName(account.user_name),
            broker_name: refineBrokerId(account.broker_name as BrokerKeyType),
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

export { useAccountListQuery };
