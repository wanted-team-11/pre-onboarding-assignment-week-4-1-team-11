import { Input, Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAccountListQuery } from "../../services/hooks/useAccountLIstQuery";
import { PATH } from "../../router/Router";
import AccountListTable from "./components/AccountListTable";

const { Search } = Input;

const AccountListPage = () => {
  const { page = "1" } = useParams();
  const {
    accountList,
    totalAccountCount = "0",
    isLoading,
  } = useAccountListQuery(parseInt(page || "1"));

  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`${PATH.SEARCH_ACCOUNT_LIST()}?query=${value}`);
  };

  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} />
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
