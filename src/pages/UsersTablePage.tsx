import { Input, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { getUserList } from "../services/axios.service";
import { dayConverter, nameMask, phoneMask } from "../utils/regfunc";
import { UserList } from "../types/types";
import { Link } from "react-router-dom";

const { Text } = Typography;
const columns: ColumnsType<UserList> = [
  {
    title: "이 름",
    dataIndex: "name",
    key: "name",
    width: 100,
    render: (name, record) =>
      name === undefined ? (
        <Text>--</Text>
      ) : (
        <Link to={`/user/users/${record.id}`}>{nameMask(name)}</Link>
      ),
  },
  {
    title: "성 별",
    dataIndex: "gender_origin",
    key: "gender_origin",
    width: 100,
    render: (gender_origin) =>
      gender_origin === undefined ? (
        <Text>--</Text>
      ) : gender_origin % 2 === 0 ? (
        <Tag>여성🙋‍♀️</Tag>
      ) : (
        <Tag>남성🙋‍♂️</Tag>
      ),
  },
  {
    title: "보유 계좌수",
    dataIndex: "account_count",
    key: "account_count",
    width: 75,
  },
  {
    title: "이메일",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "생년월일",
    dataIndex: "birth_date",
    key: "birth_date",
    render: (birth_date) =>
      birth_date === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{dayConverter(birth_date)}</Text>
      ),
  },
  {
    title: "연락처",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (phone_number) =>
      phone_number ? <Text>{phoneMask(phone_number)}</Text> : <Text>--</Text>,
  },
  {
    title: "최근 로그인",
    dataIndex: "last_login",
    key: "last_login",
    render: (last_login) =>
      last_login === undefined ? (
        <Text>--</Text>
      ) : (
        <Text>{dayConverter(last_login)}</Text>
      ),
  },
  {
    title: "혜택 수신 동의",
    dataIndex: "allow_marketing_push",
    key: "allow_marketing_push",
    width: 95,
    render: (allow_marketing_push) =>
      allow_marketing_push === undefined ? (
        <Tag>--</Tag>
      ) : allow_marketing_push ? (
        <Tag color="success">동의</Tag>
      ) : (
        <Tag color="error">미동의</Tag>
      ),
  },
  {
    title: "활성화 여부",
    dataIndex: "is_active",
    key: "is_active",
    width: 90,
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

const UsersTablePage = () => {
  const [userInfoList, setUserInfoList] = useState<UserList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getTableData = async () => {
      try {
        setIsLoading(true);
        const result = await getUserList();
        setUserInfoList(result);
      } catch (error) {
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    getTableData();
  }, []);

  const onSearchEmailFilter = (value: string) => {
    console.log(value);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Space>
        <Input.Search onSearch={onSearchEmailFilter} />
      </Space>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={userInfoList}
        scroll={{ y: 600 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};
export default UsersTablePage;
