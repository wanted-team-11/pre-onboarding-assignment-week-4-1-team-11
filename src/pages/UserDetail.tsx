import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { fetchUser, fetchUserByUuid } from "../services/api/userApi";
import useUserColumns from "../hooks/useUserColumns";
import useAccountColumns from "../hooks/useAccountColumns";
import { User, UserByUuid, FilteredUser, FilteredAccounts } from "../types";
import { fetchAccountsByUserId } from "../services/api/accountApi";

function UserDetail() {
  const location = useLocation();
  const { pathname } = location;
  const userId = Number(pathname.split("/")[2]);
  const [user, setUser] = useState<FilteredUser[]>([]);
  const [form] = Form.useForm();
  const [accounts, setAccounts] = useState<FilteredAccounts[]>([]);
  const [userByUuid, setUserByUuid] = useState<UserByUuid[]>([]);
  const uuid = user[0]?.uuid || "undefined";

  const { userFirstColumns, userSecondColumns } = useUserColumns("detail");
  const accountColumns = useAccountColumns("userDetail");

  useEffect(() => {
    fetchAccountsByUserId(userId)
      .then((res) => {
        setAccounts(res.data);
      })
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
            account_count: accounts.length,
            allow_marketing_push: allowMarketingPush,
            is_active: isActive,
          },
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accounts.length, userByUuid, userId]);

  useEffect(() => {
    fetchUserByUuid(uuid)
      .then((res) => {
        setUserByUuid(res.data);
      })
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
          columns={userFirstColumns}
          rowClassName="editable-row"
          pagination={false}
          style={{ margin: "40px 40px 0" }}
        />
        <Table
          bordered
          dataSource={user}
          columns={userSecondColumns}
          rowClassName="editable-row"
          pagination={false}
          style={{ margin: "0 40px" }}
        />
        <Table
          bordered
          dataSource={accounts}
          title={() => <div style={{ fontSize: "25px" }}>계좌목록</div>}
          columns={accountColumns}
          rowClassName="editable-row"
          pagination={false}
          style={{ margin: "50px 40px" }}
        />
      </Form>
    </PageLayout>
  );
}

export default UserDetail;
