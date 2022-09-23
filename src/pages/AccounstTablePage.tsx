import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { getAccountList } from "../services/axios.service";
import { dayConverter } from "../services/regfunc";
import { AccountList } from "../types/types";

const { Text } = Typography;
const columns: ColumnsType<AccountList> = [
  {
    title: "고객명",
    dataIndex: "user_name",
    key: "user_name",
    width: 100,
    render: (user_name) =>
      user_name === undefined ? <Text>--</Text> : <Text>{user_name}</Text>,
  },
  {
    title: "증권사",
    dataIndex: "broker_name",
    key: "broker_name",
    width: 75,
  },
  {
    title: "계좌번호",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "계좌상태",
    dataIndex: "status",
    key: "status",
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
      />
    </div>
  );
};
export default AccounstTablePage;

// - 고객명(user_name)
// - 브로커명(broker_name) : 예시) OO증권,
// - 계좌번호(number) :
// - 계좌상태(status) : 예시) 운용중,
// - 계좌명(name) : 계좌명입니다.
// - 평가금액(assets) : 예시) 123,123,123
// - 입금금액(payments) : 예시) 123,123,123
// - 계좌활성화여부(is_active) : 계좌 활성화 여부
// - 계좌개설일(created_at) :
