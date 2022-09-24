import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { getAccountList } from "../services/axios.service";
import { dayConverter } from "../utils/regfunc";
import {
  AccountBrokerFormat,
  AccountList,
  AccountStatus,
  Broker,
} from "../types/types";

import { Link } from "react-router-dom";
import { broker } from "../utils/broker";
import { accountMask, accountReg } from "../utils/accountReg";
import { accountStatus } from "../utils/accountStatus";

const statusColor = {
  9999: "warning",
  1: "processing",
  2: "lime",
  3: "error",
  4: "default",
};

const accountBrokerFormat: AccountBrokerFormat = {
  "209": "00-00000000-00",
  "218": "00-0000000-000",
  "230": "00-000000-0000",
  "238": "00-000-0000-000",
  "240": "00-0000-000000",
  "243": "00-000000000-0",
  "247": "00-0000-000000",
  "261": "00-00-00000000",
  "262": "00-0000000-000",
  "263": "00-0000-000000",
  "264": "00-0000-00-0000",
  "265": "00-000-000-0000",
  "266": "00-00000-00000",
  "267": "00-000-0000000",
  "268": "00-000000-00-00",
  "269": "00-00000-00000",
  "270": "00-000-0000000",
  "279": "00-00000-00000",
  "280": "00-0000-000000",
  "288": "00-00000000-00",
  "287": "00-0000-00000-0",
  "290": "00-000000-0000",
  "291": "00-0000-000000",
  "292": "00-00000-00000",
  "271": "00-000-0000000",
};

const { Text } = Typography;
const columns: ColumnsType<AccountList> = [
  {
    title: "고객명",
    dataIndex: "user_name",
    key: "user_name",
    width: 100,
    render: (user_name, record) =>
      user_name === undefined ? (
        <Text>--</Text>
      ) : (
        <Link to={`/user/users/${record.user_id}`}>{user_name}</Link>
      ),
  },
  {
    title: "증권사",
    dataIndex: "broker_id",
    key: "broker_id",
    render: (broker_id: keyof Broker) =>
      broker_id === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{broker[broker_id]}</Text>
      ),
  },
  {
    title: "계좌번호",
    dataIndex: "number",
    key: "number",
    render: (number, record) =>
      number === undefined ? (
        <Text>--</Text>
      ) : (
        <Link to={`/account/accounts/${record.number}`}>
          {accountReg(
            accountBrokerFormat[record.broker_id],
            accountMask(number)
          )}
        </Link>
      ),
  },
  {
    title: "계좌상태",
    dataIndex: "status",
    key: "status",
    render: (status: keyof AccountStatus) =>
      status === undefined ? (
        <Tag>--</Tag>
      ) : (
        <Tag color={statusColor[status]}>{accountStatus[status]}</Tag>
      ),
  },
  {
    title: "계좌명",
    dataIndex: "name",
    key: "name",
    render: (name) => (name ? <Text>{name}</Text> : <Text>--</Text>),
  },
  {
    title: "평가금액",
    dataIndex: "assets",
    key: "assets",
    render: (assets) =>
      assets === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{parseInt(assets).toLocaleString()}</Text>
      ),
  },
  {
    title: "입금금액",
    dataIndex: "payments",
    key: "payments",
    render: (payments) =>
      payments === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{parseInt(payments).toLocaleString()}</Text>
      ),
  },
  {
    title: "계좌 활성화",
    dataIndex: "is_active",
    key: "is_active",
    width: 95,
    filters: [
      { text: "활성화", value: true },
      { text: "비활성화", value: false },
    ],
    onFilter: (value, record) => (record.is_active === value ? true : false),
    render: (is_active) =>
      is_active === undefined ? (
        <Tag>--</Tag>
      ) : is_active ? (
        <Tag color="success">활성화</Tag>
      ) : (
        <Tag color="error">비활성화</Tag>
      ),
  },
  {
    title: "계좌개설일",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at) =>
      created_at === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{dayConverter(created_at)}</Text>
      ),
  },
  {
    title: "가입일",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at) =>
      created_at === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{dayConverter(created_at)}</Text>
      ),
  },
];

const AccounstTablePage = () => {
  const [accountInfoList, steAccountInfoList] = useState<AccountList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getTableData = async () => {
      try {
        setIsLoading(true);
        const result = await getAccountList();
        steAccountInfoList(result);
      } catch (error) {
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    getTableData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={accountInfoList}
        scroll={{ y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};
export default AccounstTablePage;
