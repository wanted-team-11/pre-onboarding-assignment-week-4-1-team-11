import React from "react";
import { Link } from "react-router-dom";
import { FilteredUser, Columns } from "../types";
import { maskingPhoneNumber, maskingName } from "../utils/masking";
import { convertUserInfo } from "../utils/convert";
import { Image } from "antd";

const useUserColumns = (page: string) => {
  const columns: Columns[] = [
    {
      title: "보유중인 계좌수",
      dataIndex: "account_count",
      width: "130px",
      editable: true,
    },
    {
      title: "이메일 주소",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "성별코드",
      dataIndex: "gender_origin",
      width: "100px",
      editable: true,
      render: (genderCode: number) => {
        return <>{genderCode ? genderCode : "-"}</>;
      },
    },
    {
      title: "생년월일",
      dataIndex: "birth_date",
      width: "110px",
      editable: true,
      render: (birthDate: string) => {
        return <>{birthDate ? birthDate?.split("T")[0] : "-"}</>;
      },
    },
    {
      title: "휴대폰 번호",
      dataIndex: "phone_number",
      editable: true,
      render: (phoneNumber: string) => {
        return <>{phoneNumber ? maskingPhoneNumber(phoneNumber) : "-"}</>;
      },
    },
    {
      title: "최근 로그인",
      dataIndex: "last_login",
      editable: true,
      render: (lastLogin: string) => {
        return (
          <>
            {lastLogin ? (
              <>
                <div>{`${lastLogin?.slice(0, 10)} ${lastLogin?.slice(
                  11,
                  16
                )}`}</div>
              </>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      title: "혜택 수신 동의 여부",
      dataIndex: "allow_marketing_push",
      editable: true,
      render: (allowMarketingPush: boolean) => {
        return <>{convertUserInfo(allowMarketingPush)}</>;
      },
    },
    {
      title: "활성화 여부",
      dataIndex: "is_active",
      editable: true,
      render: (isActive: boolean) => {
        return <div>{convertUserInfo(isActive)}</div>;
      },
    },
    {
      title: "가입일",
      dataIndex: "created_at",
      editable: true,
      render: (createdAt: string) => {
        return <>{createdAt ? <>{createdAt?.split("T")[0]}</> : "-"}</>;
      },
    },
  ];

  const photo = {
    title: "사진",
    editable: true,
    dataIndex: "photo",
    width: "30px",
    render: (photo: string) => {
      return <Image width={100} src={photo} />;
    },
  };

  const userName = {
    title: "고객명",
    editable: true,
  };

  const address = {
    title: "주소",
    editable: true,
    dataIndex: "address",
  };

  const detailAddress = {
    title: "상세주소",
    editable: true,
    dataIndex: "detail_address",
  };

  const age = {
    title: "나이",
    editable: true,
    dataIndex: "age",
    width: "70px",
  };

  if (page === "list") {
    columns.unshift({
      ...userName,
      dataIndex: "operation",
      render: (_: any, record: FilteredUser) => {
        const name = record.name;
        return (
          <>
            {name ? (
              <Link to={`/user/${record!.id}`}>{maskingName(name)}</Link>
            ) : (
              <>관리자</>
            )}
          </>
        );
      },
    });
  } else if (page === "detail") {
    columns.unshift(photo, { ...userName, dataIndex: "name" }, age);
    columns.push(address, detailAddress);
  } else {
    columns.unshift({ ...userName, dataIndex: "name" });
  }

  const checkDataType = (col: Columns) => {
    if (col.dataIndex === ("age" || "gender_origin" || "account_count")) {
      return "number";
    } else if (col.dataIndex === "is_active") {
      return "boolean";
    } else return "text";
  };

  const userColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: FilteredUser) => ({
        record,
        inputType: checkDataType(col),
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const userFirstColumns = columns.splice(0, 7);
  const userSecondColumns = columns;

  return { userColumns, userFirstColumns, userSecondColumns };
};

export default useUserColumns;
