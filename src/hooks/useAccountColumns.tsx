import React from "react";
import { Link } from "react-router-dom";
import { FilteredAccounts, AccountsColumns } from "../types";
import { convertStatus, convertBroker } from "../utils/convert";
import { maskingAccountNumber } from "../utils/masking";

const useAccountColumns = () => {
  const columns: AccountsColumns[] = [
    {
      title: "고객명",
      dataIndex: "operation",
      width: "10%",
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
      width: "10%",
      editable: true,
      render: (brokerId: string) => {
        return <>{convertBroker(brokerId)}</>;
      },
    },
    {
      title: "계좌번호",
      dataIndex: "number",
      width: "10%",
      editable: true,
      render: (accountNumber: string) => {
        return <>{maskingAccountNumber(accountNumber)}</>;
      },
    },
    {
      title: "계좌상태",
      dataIndex: "status",
      width: "10%",
      editable: true,
      render: (status: number) => {
        return <>{convertStatus(status)}</>;
      },
    },
    {
      title: "계좌명",
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "평가금액",
      dataIndex: "assets",
      width: "10%",
      editable: true,
      render: (assets: number) => {
        return <>{Math.ceil(assets).toLocaleString()}</>;
      },
    },
    {
      title: "입금 금액",
      dataIndex: "payments",
      width: "10%",
      editable: true,
      render: (payments: number) => {
        return <>{Math.ceil(payments).toLocaleString()}</>;
      },
    },
    {
      title: "계좌활성화여부",
      dataIndex: "is_active",
      width: "10%",
      editable: true,
      render: (isActive: boolean) => {
        return <>{isActive ? "O" : "X"}</>;
      },
    },
    {
      title: "계좌개설일",
      dataIndex: "created_at",
      width: "10%",
      editable: true,
      render: (createdAt: string) => {
        return (
          <>
            <div>{createdAt?.split("T")[0]}</div>
            <div>{createdAt?.split("T")[1]?.split(".")[0]}</div>
          </>
        );
      },
    },
  ];

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
