import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { RefinedUserInfo } from "../types";
import { userNameFormatter, phoneNumberFormatter } from "../utils/formatter";

type DataIndex = keyof RefinedUserInfo;

interface UsersTableProps {
  data: RefinedUserInfo[];
  isLoading: boolean;
}

const UsersTable = ({ data, isLoading }: UsersTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<RefinedUserInfo> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<RefinedUserInfo> = [
    {
      title: "고객명",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),
      render: (value: string, record) => (
        <Link to={`/user-detail/${record.id}`}>{userNameFormatter(value)}</Link>
      ),
    },
    {
      title: "계좌 수",
      dataIndex: "account_count",
      key: "account_count",
      width: "10%",
      ...getColumnSearchProps("account_count"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "성별",
      dataIndex: "gender_origin",
      key: "gender_origin",
      width: "7%",
      ...getColumnSearchProps("gender_origin"),
      render: (value: number) => {
        const gender = value % 2 === 0 ? "남성" : "여성";
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {gender}
          </div>
        );
      },
    },
    {
      title: "생년월일",
      dataIndex: "birth_date",
      key: "birth_date",
      width: "10%",
      ...getColumnSearchProps("birth_date"),
      render: (value: string) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat().format(date);
      },
    },
    {
      title: "전화번호",
      dataIndex: "phone_number",
      width: "12%",
      key: "phone_number",
      ...getColumnSearchProps("phone_number"),
      render: (value: string) => phoneNumberFormatter(value),
    },
    {
      title: "마지막 로그인",
      dataIndex: "last_login",
      key: "last_login",
      width: "12%",
      ...getColumnSearchProps("last_login"),
      render: (value: string) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat().format(date);
      },
    },
    {
      title: "마케팅 푸시",
      dataIndex: "allow_marketing_push",
      key: "allow_marketing_push",
      width: "10%",
      ...getColumnSearchProps("allow_marketing_push"),
      render: (value?: boolean) => {
        const text = value === true ? "O" : value === false ? "X" : "";
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "활성여부",
      dataIndex: "is_active",
      key: "is_active",
      width: "10%",
      ...getColumnSearchProps("is_active"),
      render: (value?: boolean) => {
        const [text, color] =
          value === true
            ? ["활성", "success"]
            : value === false
            ? ["비활성", "error"]
            : ["", "default"];
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tag color={color}>{text}</Tag>
          </div>
        );
      },
    },
    {
      title: "생성일자",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      ...getColumnSearchProps("created_at"),
      render: (value: string) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat().format(date);
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={isLoading}
    />
  );
};

export default UsersTable;
