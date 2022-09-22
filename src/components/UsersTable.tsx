import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { UserWithMoreInfo } from "../types";

type DataIndex = keyof UserWithMoreInfo;

const UsersTable = ({ data }: { data: UserWithMoreInfo[] }) => {
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
  ): ColumnType<UserWithMoreInfo> => ({
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

  const columns: ColumnsType<UserWithMoreInfo> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Account Count",
      dataIndex: "account_count",
      key: "account_count",
      width: "5%",
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
      title: "Gender Origin",
      dataIndex: "gender_origin",
      key: "gender_origin",
      width: "5%",
      ...getColumnSearchProps("gender_origin"),
    },
    {
      title: "Birth Date",
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
      title: "Phone Number",
      dataIndex: "phone_number",
      width: "10%",
      key: "phone_number",
      ...getColumnSearchProps("phone_number"),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      width: "10%",
      ...getColumnSearchProps("last_login"),
      render: (value: string) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat().format(date);
      },
    },
    {
      title: "Marketing Push",
      dataIndex: "allow_marketing_push",
      key: "allow_marketing_push",
      width: "5%",
      ...getColumnSearchProps("allow_marketing_push"),
      render: (value: boolean) => value.toString(),
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      width: "5%",
      ...getColumnSearchProps("is_active"),
      render: (value: boolean) => value.toString(),
    },
    {
      title: "Created",
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

export default UsersTable;
