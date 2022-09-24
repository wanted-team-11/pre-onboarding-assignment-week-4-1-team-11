import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Pagination } from "antd";
import { enactAccountList } from "../api/callApi";
import Highlighter from "react-highlight-words";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import brokers from "../static/brokers.json";

const AccountListTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const enactAccountList_query = useQuery(
    ["enactaccount_list"],
    () => enactAccountList(),
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

  console.log(brokers);

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
      dataIndex: "user_name",
      key: "user_name",
      width: "7%",
      ...getColumnSearchProps("user_name"),
      render: (name: string) => {
        return (
          <>
            {name !== undefined ? (
              <Link to={`/user_detail:${enactAccountList_query.data[0].uuid}`}>
                {maskingName(name)}
              </Link>
            ) : null}
          </>
        );
      },
    },
    {
      title: "브로커명",
      dataIndex: "broker_id",
      key: "broker_id",
      width: "7%",
      render: (broker_id: string) => {
        const keys = Object.keys(brokers);

        return <>{broker_id}</>;
      },
    },
    {
      title: "계좌번호",
      dataIndex: "number",
      key: "number",
      width: "7%",
    },
    {
      title: "계좌상태",
      dataIndex: "status",
      key: "status",
      width: "7%",
    },
    {
      title: "계좌명",
      dataIndex: "name",
      key: "name",
      width: "7%",
    },
    {
      title: "평가금액",
      dataIndex: "assets",
      key: "assets",
      width: "7%",
    },
    {
      title: "입금금액",
      dataIndex: "payments",
      key: "payments",
      width: "7%",
    },
    {
      title: "계좌활성화여부",
      dataIndex: "is_active",
      key: "is_active",
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
      title: "계좌개설일",
      dataIndex: "created_at",
      key: "created_at",
      width: "7%",
      render: (createdAt: string) => {
        return <>{createdAt !== undefined ? organizeTime(createdAt) : null}</>;
      },
    },
  ] as any;

  return (
    <UserListTableContainer>
      {enactAccountList_query.data && (
        <>
          <Table
            columns={columns}
            dataSource={enactAccountList_query.data}
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

export default AccountListTable;

const UserListTableContainer = styled.div`
  padding: 20px;
`;

const AntdPagination = styled(Pagination)`
  text-align: center;
  margin-top: 20px;
`;
