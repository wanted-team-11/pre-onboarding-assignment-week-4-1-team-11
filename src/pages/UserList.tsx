import React, { useEffect, useState } from "react";
import { Form, Pagination, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { fetchUser, fetchUserByPageNumber } from "../services/api/userApi";
import MergedColumns from "../components/MergedColumns";

const UserList = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(page);
    fetchUser()
      .then((res) => {
        setTotalCount(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  useEffect(() => {
    fetchUserByPageNumber(page)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    setPage(Number(search.split("=")[1]));
  }, [search]);

  const mergedColumns = MergedColumns("list");
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={user}
          columns={mergedColumns}
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
