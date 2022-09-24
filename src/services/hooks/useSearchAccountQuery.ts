import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchSearchAccountList } from "../api/fetchSearchAccountList";
import {
  AccountStatusKeyType,
  BrokerFormatType,
  BrokerKeyType,
} from "../models/statics";
import useRefine from "./useRefine";

type Props = {
  query: string;
  pageNumber: string;
};

const useSearchAccountListQuery = ({ query, pageNumber }: Props) => {
  const {
    refineName,
    refineDate,
    refineBrokerId,
    refineAccountStatus,
    refineAccountNumberFormat,
    refineAccountNumberMask,
  } = useRefine();

  const { data, ...queryResult } = useQuery(
    ["getUserList", pageNumber, query],
    () => fetchSearchAccountList({ query, pageNumber }),
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

export { useSearchAccountListQuery };
