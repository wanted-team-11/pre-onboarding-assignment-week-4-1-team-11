import { Spin, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useUserListQuery } from "../../../services/hooks/useUserListQuery";
import { UserListProps } from "../../../types/user";

const columns: ColumnsType<UserListProps> = [
  {
    title: "고객명",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "보유 계좌",
    dataIndex: "account_count",
    key: "account_count",
  },
  {
    title: "이메일",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "주민등록상 성별코드",
    dataIndex: "gender_origin",
    key: "gender_origin",
  },
  {
    title: "생년월일",
    dataIndex: "birth_date",
    key: "birth_date",
  },
  {
    title: "휴대폰",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "최근로그인",
    dataIndex: "last_login",
    key: "last_login",
  },
  {
    title: "혜택 수신 동의 여부",
    dataIndex: "allow_marketing_push",
    key: "allow_marketing_push",
    render: (bool) => (bool ? "예" : "아니오"),
  },
  {
    title: "활성화 여부",
    dataIndex: "is_active",
    key: "is_active",
    render: (bool) => (bool ? "예" : "아니오"),
  },
  {
    title: "가입일",
    dataIndex: "created_at",
    key: "created_at",
  },
];

const UserList = () => {
  const { userList, isLoading } = useUserListQuery();

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : userList ? (
        <Table columns={columns} dataSource={userList} />
      ) : (
        "no users"
      )}
    </>
  );
};

export default UserList;
