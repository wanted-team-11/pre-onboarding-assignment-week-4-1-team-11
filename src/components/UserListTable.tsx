import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Pagination } from "antd";
import { enactUserList } from "../api/callApi";
import Highlighter from "react-highlight-words";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const UserListTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const enactUserList_query = useQuery(
    ["enactuser_list"],
    () => enactUserList(),
    {
      onSuccess: (data) => {
        console.log("enactuserList", data);
        setIsLoading(false);
      },
      onError: (err: any) => {
        alert(`${err.response.data}`);
      },
    }
  );

  const maskingName = function (strName: string) {
    if (strName.length > 2) {
      const originName = strName.split("");
      originName.forEach(function (name, i) {
        if (i === 0 || i === originName.length - 1) return;
        originName[i] = "*";
      });
      const joinName = originName.join();
      return joinName.replace(/,/g, "");
    } else {
      const pattern = /.$/;
      return strName.replace(pattern, "*");
    }
  };

  const maskingPhone = (phone: string) => {
    return (
      phone.substring(0, 3) +
      "****" +
      phone.substring(phone.length - 4, phone.length)
    );
  };

  const organizeDay = (data: string) => {
    return data.substring(0, 10);
  };

  const organizeTime = (data: string) => {
    return data.substring(0, 10) + " " + data.substring(11, 16);
  };

  const handleSearch = (
    selectedKeys: React.SetStateAction<string>[],
    confirm: () => void,
    dataIndex: React.SetStateAction<string>
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: any;
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),

    onFilter: (
      value: string,
      record: { [x: string]: { toString: () => string } }
    ) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: { toString: () => string }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      width: "7%",
      ...getColumnSearchProps("name"),
      render: (name: string, record: string) => {
        return (
          <>
            {name !== undefined ? (
              <Link to={`/user_detail:${enactUserList_query.data[0].uuid}`}>
                {maskingName(name)}
              </Link>
            ) : null}
          </>
        );
      },
    },
    {
      title: "나이",
      dataIndex: "age",
      key: "age",
      width: "7%",
    },
    {
      title: "성별",
      dataIndex: "gender_origin",
      key: "gender_origin",
      width: "7%",
      render: (gender: number) => {
        return (
          <>
            {gender !== undefined
              ? gender === 1
                ? "남자"
                : gender === 2
                ? "여자"
                : "기타"
              : null}
          </>
        );
      },
    },
    {
      title: "생년월일",
      dataIndex: "birth_date",
      key: "birth_date",
      width: "7%",
      render: (Birthday: string) => {
        return <>{Birthday !== undefined ? organizeDay(Birthday) : null}</>;
      },
    },
    {
      title: "계좌수",
      dataIndex: "account_count",
      key: "account_count",
      width: "7%",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      width: "7%",
    },
    {
      title: "전화번호",
      dataIndex: "phone_number",
      key: "phone_number",
      width: "7%",
      render: (phoneNumber: string) => {
        return (
          <>{phoneNumber !== undefined ? maskingPhone(phoneNumber) : null}</>
        );
      },
    },
    {
      title: "혜택정보 수신",
      dataIndex: "allow_marketing_push",
      key: "allow_marketing_push",
      width: "8%",
      render: (allow: boolean) => {
        return (
          <>
            {allow !== undefined
              ? allow === true
                ? "O"
                : allow === false
                ? "X"
                : null
              : null}
          </>
        );
      },
    },
    {
      title: "활성화 여부",
      dataIndex: "is_active",
      key: "is_active",
      width: "7%",
      filters: [
        { text: "활성화", value: true },
        { text: "비활성화", value: false },
      ],
      onFilter: (value: any, record: { is_active: any }) =>
        record.is_active === value ? true : false,
      render: (allow: boolean) => {
        return (
          <>
            {allow !== undefined
              ? allow === true
                ? "O"
                : allow === false
                ? "X"
                : null
              : null}
          </>
        );
      },
    },
    {
      title: "가입 시각",
      dataIndex: "created_at",
      key: "created_at",
      width: "7%",
      render: (createdAt: string) => {
        return <>{createdAt !== undefined ? organizeTime(createdAt) : null}</>;
      },
    },
    {
      title: "최근 로그인",
      dataIndex: "last_login",
      key: "last_login",
      width: "7%",
      render: (lastLogin: string) => {
        return <>{lastLogin !== undefined ? organizeTime(lastLogin) : null}</>;
      },
    },
    {
      title: "주소",
      dataIndex: "address",
      key: "address",
      width: "7%",
    },
  ] as any;

  return (
    <UserListTableContainer>
      {enactUserList_query.data && (
        <>
          <Table
            columns={columns}
            dataSource={enactUserList_query.data}
            loading={isLoading}
            rowKey={(key) => key.uuid}
          />
          {/* <AntdPagination
            defaultCurrent={1}
            total={enactUserList_query.data.length}
            onChange={(pageClick) => navigate(`/user?page=${pageClick}`)}
          /> */}
        </>
      )}
    </UserListTableContainer>
  );
};

export default UserListTable;

const UserListTableContainer = styled.div`
  padding: 20px;
`;

const AntdPagination = styled(Pagination)`
  text-align: center;
  margin-top: 20px;
`;
