import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { RefinedAccountInfo } from "../types";

type DataIndex = keyof RefinedAccountInfo;

const AccountsTable = ({ data }: { data: RefinedAccountInfo[] }) => {
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
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      width: "10%",
      ...getColumnSearchProps("user_name"),
    },
    {
      title: "Broker Name",
      dataIndex: "broker_name",
      key: "broker_name",
      width: "10%",
      ...getColumnSearchProps("broker_name"),
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      width: "10%",
      ...getColumnSearchProps("number"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "5%",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Name",
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
      title: "Is Active",
      dataIndex: "is_active",
      key: "is_active",
      width: "5%",
      ...getColumnSearchProps("is_active"),
      render: (value?: boolean) => value?.toString(),
    },
    {
      title: "Created At",
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

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default AccountsTable;
