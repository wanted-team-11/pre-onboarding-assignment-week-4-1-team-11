import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Columns } from "../types";

function MergedColumns(page: string) {
  const maskingPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber)
      return (
        phoneNumber.substring(0, 3) +
        "-****-" +
        phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length)
      );
  };

  const maskingName = (name: string) => {
    if (name) {
      return (
        name.substring(0, 1) +
        "*".repeat(name.length - 2) +
        name.substring(name.length - 1, name.length)
      );
    } else {
      return "관리자";
    }
  };

  const columns: Columns[] = [
    {
      title: "보유중인 계좌수", // 정제
      dataIndex: "account_count",
      width: "10%",
      editable: true,
    },
    {
      title: "이메일 주소",
      dataIndex: "email",
      width: "10%",
      editable: true,
    },
    {
      title: "성별코드",
      dataIndex: "gender_origin",
      width: "10%",
      editable: true,
    },
    {
      title: "생년월일",
      dataIndex: "birth_date",
      width: "10%",
      editable: true,
      render: (birthDate: string) => {
        return <>{birthDate?.split("T")[0]}</>;
      },
    },
    {
      title: "휴대폰 번호",
      dataIndex: "phone_number",
      width: "10%",
      editable: true,
      render: (phoneNumber: string) => {
        return <>{maskingPhoneNumber(phoneNumber)}</>;
      },
    },
    {
      title: "최근 로그인",
      dataIndex: "last_login",
      width: "10%",
      editable: true,
      render: (lastLogin: string) => {
        return (
          <>
            <div>{lastLogin?.split("T")[0]}</div>
            <div>{lastLogin?.split("T")[1]?.split(".")[0]}</div>
          </>
        );
      },
    },
    {
      title: "혜택 수신 동의 여부", // 정제
      dataIndex: "allow_marketing_push",
      width: "10%",
      editable: true,
      render: (allowMarketingPush: boolean) => {
        return <div>{allowMarketingPush ? "O" : "X"}</div>;
      },
    },
    {
      title: "활성화 여부", // 정제
      dataIndex: "is_active",
      width: "10%",
      editable: true,
      render: (isActive: boolean) => {
        return <div>{isActive ? "O" : "X"}</div>;
      },
    },
    {
      title: "가입일",
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

  const userName = {
    title: "고객명",
    width: "10%",
    editable: true,
    render: (name: string) => {
      return <>{maskingName(name)}</>;
    },
  };

  if (page === "list") {
    columns.unshift({
      ...userName,
      dataIndex: "operation",
      render: (_: any, record: User) => {
        return (
          <Link to={`/user/${record!.id}`}>{maskingName(record?.name)}</Link>
        );
      },
    });
  } else {
    columns.unshift({ ...userName, dataIndex: "name" });
  }

  const checkDataType = (col: Columns) => {
    if (col.dataIndex === "age" || "gender_origin" || "account_count") {
      return "number";
    } else if (col.dataIndex === "is_active") {
      return "boolean";
    } else return "text";
  };

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: User) => ({
        record,
        inputType: checkDataType(col),
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return mergedColumns;
}

export default MergedColumns;
