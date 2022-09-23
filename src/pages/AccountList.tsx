import React, { useEffect, useState } from "react";
import { Form, Pagination, Table } from "antd";
import PageLayout from "../components/PageLayout";
import {
  fetchAccounts,
  fetchAccountsByPageNumber,
} from "../services/api/accountApi";
import { FilteredAccounts } from "../types";
import AccountColumns from "../components/AccountColumns";
import { useNavigate, useLocation } from "react-router-dom";

function AccountList() {
  const [form] = Form.useForm();
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();
  const { search } = location;
  const [page, setPage] = useState(Number(search.split("=")[1]));

  useEffect(() => {
    fetchAccounts()
      .then((res) => {
        setTotalCount(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  useEffect(() => {
    const pageNum = Number(search.split("=")[1]);
    setPage(pageNum);
  }, [search]);

  const accountColumns = AccountColumns();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState<FilteredAccounts[]>([]);

  useEffect(() => {
    fetchAccountsByPageNumber(page)
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  return (
    <PageLayout>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={accounts}
          columns={accountColumns}
          rowClassName="editable-row"
          pagination={false}
        />
        <Pagination
          onChange={(e) => navigate(`/accounts?page=${e}`)}
          total={totalCount}
          showSizeChanger={false}
          showQuickJumper
          style={{ textAlign: "center", position: "relative", top: "15px" }}
          showTotal={(total) => `Total ${total} accounts`}
        />
      </Form>
    </PageLayout>
  );
}

export default AccountList;
