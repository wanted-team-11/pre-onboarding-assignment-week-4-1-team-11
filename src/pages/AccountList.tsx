import { Form, Pagination, Table } from "antd";
import PageLayout from "../components/PageLayout";
import useAccountColumns from "../hooks/useAccountColumns";
import { useNavigate } from "react-router-dom";
import useAccounts from "../hooks/useAccounts";

function AccountList() {
  const [form] = Form.useForm();
  const { accounts, totalCount } = useAccounts();

  const accountColumns = useAccountColumns();
  const navigate = useNavigate();

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
