import React from "react";
import { Form, Pagination, Table } from "antd";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import useUserColumns from "../hooks/useUserColumns";
import useUser from "../hooks/useUser";

const UserList = () => {
  const [form] = Form.useForm();
  const { totalCount, user } = useUser();

  const userColumns = useUserColumns("list");
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={user}
          columns={userColumns}
          rowClassName="editable-row"
          pagination={false}
        />
        <Pagination
          onChange={(e) => navigate(`/user?page=${e}`)}
          total={totalCount}
          showSizeChanger={false}
          showQuickJumper
          style={{ textAlign: "center", position: "relative", top: "15px" }}
          showTotal={(total) => `Total ${total} user`}
        />
      </Form>
    </PageLayout>
  );
};

export default UserList;
