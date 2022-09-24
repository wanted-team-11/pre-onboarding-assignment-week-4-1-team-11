import React, { useEffect, useState } from "react";
import { Form, Pagination, Table, Button, Switch } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import useUserColumns from "../hooks/useUserColumns";
import useUser from "../hooks/useUser";

const UserList = () => {
  const location = useLocation();
  const pageNum = Number(new URLSearchParams(location.search).get("page"));
  const staff = new URLSearchParams(location.search).get("staff") === "1";
  const [page, setPage] = useState(pageNum);
  const [isStaff, setIsStaff] = useState(staff);
  const [form] = Form.useForm();
  const { totalCount, user } = useUser();

  const { userColumns } = useUserColumns("list");
  const navigate = useNavigate();

  const moveToOtherPage = (e: number) => {
    if (isStaff) navigate(`/user?page=${e}&staff=1`);
    else navigate(`/user?page=${e}`);
  };

  useEffect(() => {
    setPage(pageNum);
    setIsStaff(staff);
  }, [pageNum, staff]);

  const onChange = () => {
    setIsStaff(!isStaff);
    if (!isStaff) {
      navigate(`/user?page=${page}&staff=1`);
    } else {
      navigate(`/user?page=${page}`);
    }
  };

  return (
    <PageLayout>
      <Form form={form} component={false}>
        <div style={{ margin: "10px" }}>
          관리자
          <Switch
            checked={isStaff}
            onChange={onChange}
            style={{ margin: "4px", position: "relative", bottom: "1px" }}
          />
        </div>
        <Table
          bordered
          dataSource={user}
          columns={userColumns}
          rowClassName="editable-row"
          pagination={false}
        />
        <Pagination
          onChange={(e) => moveToOtherPage(e)}
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
