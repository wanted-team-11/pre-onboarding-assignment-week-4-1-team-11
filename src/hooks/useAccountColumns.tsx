import React from "react";
import { Link } from "react-router-dom";
import { FilteredAccounts, AccountsColumns } from "../types";
import { convertStatus, convertBroker } from "../utils/convert";
import { maskingAccountNumber } from "../utils/masking";

const useAccountColumns = (page: string) => {
  const columns: AccountsColumns[] = [
    {
      title: "고객명",
      dataIndex: "operation",
      editable: true,
      render: (_: any, record: FilteredAccounts) => {
        const userName = record.user_name;
        const userId = record.user_id;
        return <Link to={`/user/${userId}`}>{userName}</Link>;
      },
    },
    {
      title: "브로커명",
      dataIndex: "broker_id",
      editable: true,
      render: (brokerId: string) => {
        return <>{convertBroker(brokerId)}</>;
      },
    },
    {
      title: "계좌번호",
      dataIndex: "operation",
      editable: true,
      render: (_: any, record: FilteredAccounts) => {
        return (
          <>
            {page === "list" ? (
              <Link
                to={`/account/${record.number}`}
                state={{ account: record }}
              >
                {maskingAccountNumber(record.number)}
              </Link>
            ) : (
              <>{maskingAccountNumber(record.number)}</>
            )}
          </>
        );
      },
    },
    {
      title: "계좌상태",
      dataIndex: "status",
      editable: true,
      render: (status: number) => {
        return <>{convertStatus(status)}</>;
      },
    },
    {
      title: "계좌명",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "평가금액",
      dataIndex: "assets",
      editable: true,
      render: (assets: number) => {
        return <>{Math.ceil(assets).toLocaleString()}</>;
      },
    },
    {
      title: "입금 금액",
      dataIndex: "payments",
      editable: true,
      render: (payments: number) => {
        return <>{Math.ceil(payments).toLocaleString()}</>;
      },
    },
    {
      title: "계좌활성화여부",
      dataIndex: "is_active",
      editable: true,
      render: (isActive: boolean) => {
        return <>{isActive ? "O" : "X"}</>;
      },
    },
    {
      title: "계좌개설일",
      dataIndex: "created_at",
      editable: true,
      render: (createdAt: string) => {
        return <>{createdAt?.split("T")[0]}</>;
      },
    },
  ];

  if (page === "userDetail") columns.shift();

  const checkDataType = (col: AccountsColumns) => {
    if (
      col.dataIndex ===
      ("user_id" ||
        "broker_id" ||
        "number" ||
        "status" ||
        "assets" ||
        "payments")
    ) {
      return "number";
    } else if (col.dataIndex === "is_active") {
      return "boolean";
    } else return "text";
  };

  const accountColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: FilteredAccounts) => ({
        record,
        inputType: checkDataType(col),
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return accountColumns;
};

export default useAccountColumns;
