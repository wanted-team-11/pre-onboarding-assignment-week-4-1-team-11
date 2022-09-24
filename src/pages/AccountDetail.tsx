import React from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { Form, Table } from "antd";
import useAccountColumns from "../hooks/useAccountColumns";

function AccountDetail() {
  const { account } = useLocation().state;
  const [form] = Form.useForm();
  const accountColumns = useAccountColumns("detail");

  return (
    <PageLayout>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={[account]}
          columns={accountColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </PageLayout>
  );
}

export default AccountDetail;
