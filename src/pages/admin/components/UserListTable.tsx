import { Drawer, Popconfirm, Table, Input, Button, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { PATH } from "../../../router/Router";
import { UserProps } from "../../../types/user";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteQuery } from "../../../services/hooks/useDeleteUser";
import { SetStateAction, useState } from "react";
import { useChangeUserName } from "../../../services/hooks/useChangeUserName";

const UserListTable = ({
  userList,
  isLoading,
}: {
  userList: UserProps[] | undefined;
  isLoading: boolean;
}) => {
  const { deleteUserQuery } = useDeleteQuery();
  const [open, setOpen] = useState(false);
  const [currentRecordId, setCurrentReccordId] = useState(-1);

  const openDrawer = (recordId: number) => {
    setCurrentReccordId(recordId);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const { reviseUserQuery } = useChangeUserName(closeDrawer);

  const [newName, setNewName] = useState<string>();

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNewName(value);
  };

  const onClickConfirm = () => {
    if (!newName) {
      Modal.error({ content: "새 이름을 입력해주세요." });
      return;
    }
    const newNamePayload = {
      name: newName,
    };
    reviseUserQuery({ id: currentRecordId, newNamePayload });
  };

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
    {
      title: "고객명 수정",
      dataIndex: "amend",
      key: "amend",
      render: (_, record) => (
        <>
          <EditOutlined
            onClick={() => {
              openDrawer(record.id);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={userList}
        loading={isLoading}
        rowKey={(row) => row.id}
        pagination={false}
      />
      <Drawer
        title="계좌명 변경"
        placement="right"
        onClose={closeDrawer}
        open={open}
      >
        <Input type="text" value={newName} onChange={onInputValueChange} />
        <Button type="primary" onClick={onClickConfirm}>
          확인
        </Button>
      </Drawer>
    </>
  );
};

export default UserListTable;
