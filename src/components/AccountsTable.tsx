import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { RefinedAccountInfo, AccountStatus } from "../types";
import brokerFormat from "../utils/brokerFormat";
import accountStatus from "../utils/accountStatus";
import {
  accountFormatter,
  maskAccount,
  userNameFormatter,
} from "../utils/formatter";

type DataIndex = keyof RefinedAccountInfo;

interface AccountsTableProps {
  data: RefinedAccountInfo[];
  isLoading: boolean;
}

const AccountsTable = ({ data, isLoading }: AccountsTableProps) => {
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
  ): ColumnType<RefinedAccountInfo> => ({
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

  const columns: ColumnsType<RefinedAccountInfo> = [
    {
      title: "고객명",
      dataIndex: "user_name",
      key: "user_name",
      width: "10%",
      ...getColumnSearchProps("user_name"),
      render: (value: string, record) => (
        <Link to={`/user-detail/${record.id}`}>{userNameFormatter(value)}</Link>
      ),
    },
    {
      title: "브로커",
      dataIndex: "broker_name",
      key: "broker_name",
      width: "10%",
      ...getColumnSearchProps("broker_name"),
    },
    {
      title: "계좌번호",
      dataIndex: "number",
      key: "number",
      width: "15%",
      ...getColumnSearchProps("number"),
      render: (value: string, record) => {
        const masked = maskAccount(value);
        const formatted = accountFormatter(
          brokerFormat[record.broker_id],
          masked
        );
        return <Link to={`/account-detail/${record.uuid}`}>{formatted}</Link>;
      },
    },
    {
      title: "계좌상태",
      dataIndex: "status",
      key: "status",
      width: "12%",
      ...getColumnSearchProps("status"),
      render: (value: keyof AccountStatus) => accountStatus[value],
    },
    {
      title: "계좌명",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Assets",
      dataIndex: "assets",
      width: "12%",
      key: "assets",
      ...getColumnSearchProps("assets"),
      render: (value: string) =>
        new Intl.NumberFormat().format(parseInt(value)),
    },
    {
      title: "Payments",
      dataIndex: "payments",
      key: "payments",
      width: "10%",
      ...getColumnSearchProps("payments"),
      render: (value: string) =>
        new Intl.NumberFormat().format(parseInt(value)),
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
      width: "12%",
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

export default AccountsTable;
