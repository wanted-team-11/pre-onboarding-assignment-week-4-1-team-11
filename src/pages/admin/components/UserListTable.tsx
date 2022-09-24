import { Popconfirm, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { PATH } from "../../../router/Router";
import { UserProps } from "../../../types/user";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteQuery } from "../../../services/hooks/useDeleteUser";

const UserListTable = ({
  userList,
  isLoading,
}: {
  userList: UserProps[] | undefined;
  isLoading: boolean;
}) => {
  const { deleteUserQuery } = useDeleteQuery();

  const columns: ColumnsType<UserProps> = [
    {
      title: "고객명",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Link to={`${PATH.USER_DETAIL(record.id + "")}`}>{name}</Link>
      ),
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
      title: "성별코드",
      dataIndex: "gender_origin",
      key: "gender_origin",
      render: (gender_origin) =>
        gender_origin === undefined ? (
          <Tag>--</Tag>
        ) : gender_origin % 2 === 0 ? (
          <Tag>여성🙋‍♀️</Tag>
        ) : (
          <Tag>남성🙋‍♂️</Tag>
        ),
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
      filters: [
        {
          text: "true",
          value: true,
        },
        {
          text: "false",
          value: false,
        },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: "가입일",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "임직원 계좌 여부",
      dataIndex: "is_staff",
      key: "is_staff",
      render: (bool) =>
        bool ? <Tag color="lime">임직원</Tag> : <Tag color="default">고객</Tag>,
      filters: [
        {
          text: <Tag color="lime">임직원</Tag>,
          value: true,
        },
        {
          text: <Tag color="default">고객</Tag>,
          value: false,
        },
      ],
      onFilter: (value, record) => record.is_staff === value,
    },
    {
      title: "삭제",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          placement="top"
          title={"삭제 하시겠습니까?"}
          onConfirm={() => {
            deleteUserQuery(record.id + "");
          }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={userList}
      loading={isLoading}
      rowKey={(row) => row.id}
      pagination={false}
    />
  );
};

export default UserListTable;
