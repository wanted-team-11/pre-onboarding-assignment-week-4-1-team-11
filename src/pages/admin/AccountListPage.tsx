import { Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAccountsQuery } from "../../services/hooks/useAccountsQuery";
import { PATH } from "../../router/Router";
import AccountListTable from "./components/AccountListTable";

const AccountListPage = () => {
  const { page = "1" } = useParams();
  const {
    accountList,
    totalAccountCount = "0",
    isLoading,
  } = useAccountsQuery(parseInt(page || "1"));

  const navigate = useNavigate();

  return (
    <>
      <AccountListTable accountList={accountList} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          total={parseInt(totalAccountCount)}
          pageSize={20}
          current={parseInt(page)}
          onChange={(page) => {
            navigate(PATH.ACCOUNT_LIST(page + ""));
          }}
        />
      )}
    </>
  );
};

export default AccountListPage;
