import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { fetchUser, fetchUserByUuid } from "../services/api/userApi";
import MergedColumns from "../components/MergedColumns";
import { User, UserByUuid } from "../types";
import { fetchAccountsByUserId } from "../services/api/accountApi";

function UserDetail() {
  const location = useLocation();
  const { pathname } = location;
  const userId = Number(pathname.split("/")[2]);
  const [user, setUser] = useState<User[]>([]);
  const [form] = Form.useForm();
  const [accountNum, setAccountNum] = useState(0);
  const [userByUuid, setUserByUuid] = useState<UserByUuid[]>([]);
  const uuid = user[0]?.uuid;

  const mergedColumns = MergedColumns("detail");

  useEffect(() => {
    fetchAccountsByUserId(userId)
      .then((res) => {
        setAccountNum(res.data.length);
      })
      .then()
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchUser()
      .then((res) => {
        const filteredData = res.data.filter(
          (data: User) => data.id === Number(userId)
        );
        const allowMarketingPush = userByUuid[0]?.allow_marketing_push;
        const isActive = userByUuid[0]?.is_active;
        setUser([
          {
            ...filteredData[0],
            account_count: accountNum,
            allow_marketing_push: allowMarketingPush,
            is_active: isActive,
          },
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accountNum, userByUuid, userId]);

  useEffect(() => {
    fetchUserByUuid(uuid)
      .then((res) => {
        setUserByUuid(res.data);
      })
      .then()
      .catch((err) => {
        console.error(err);
      });
  }, [uuid]);

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
      </Form>
    </PageLayout>
  );
}

export default UserDetail;
