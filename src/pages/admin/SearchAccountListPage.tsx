import { Input, Pagination } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PATH } from "../../router/Router";
import { useSearchAccountListQuery } from "../../services/hooks/useSearchAccountQuery";
import AccountListTable from "./components/AccountListTable";

const { Search } = Input;

const SearchAccountListPage = () => {
  const navigate = useNavigate();
  const { page = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    accountList,
    totalAccountCount = "0",
    isLoading,
  } = useSearchAccountListQuery({
    query,
    pageNumber: page,
  });

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
            navigate(`${PATH.SEARCH_ACCOUNT_LIST(page + "")}?query=${query}`);
          }}
        />
      )}
    </>
  );
};

export default SearchAccountListPage;
