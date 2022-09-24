import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { AccountProps } from "../../../types/user";
import brokers from "../../../services/static/brokers.json";
import { PATH } from "../../../router/Router";
import styled from "styled-components";

const columns: ColumnsType<AccountProps> = [
  {
    title: "고객명",
    dataIndex: "user_name",
    key: "user_name",
    render: (user_name, record) => (
      <Link to={`${PATH.USER_DETAIL(record.user_id + "")}`}>{user_name}</Link>
    ),
  },
  {
    title: "브로커명",
    dataIndex: "broker_name",
    key: "broker_name",
    filters: Object.values(brokers).map((e) => ({ text: e, value: e })),
    onFilter: (value, record) => record.broker_name === value,
  },
  {
    title: "계좌번호",
    dataIndex: "number",
    key: "number",
    render: (account_number, record) => (
      <Link to={`${PATH.ACCOUNT_DETAIL(record.uuid)}`}>{account_number}</Link>
    ),
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
  },
  {
    title: "평가금액",
    dataIndex: "assets",
    key: "assets",
    render: (assets, record) => (
      <>
        {assets > record.payments ? (
          <PlusText>{assets}</PlusText>
        ) : (
          <MinusText>{assets}</MinusText>
        )}
      </>
    ),
  },
  {
    title: "입금금액",
    dataIndex: "payments",
    key: "payments",
  },
  {
    title: "계좌활성화여부",
    dataIndex: "is_active",
    key: "is_active",
    render: (bool) => (bool ? "예" : "아니오"),
  },
  {
    title: "계좌개설일",
    dataIndex: "created_at",
    key: "created_at",
  },
];

const AccountListTable = ({
  accountList,
  isLoading,
}: {
  accountList: AccountProps[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={accountList}
      rowKey={(row) => row.uuid}
      pagination={false}
    />
  );
};

export default AccountListTable;

const PlusText = styled.div`
  color: red;
`;
const MinusText = styled.div`
  color: blue;
`;
