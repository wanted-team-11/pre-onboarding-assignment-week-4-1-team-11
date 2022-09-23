import { Input, Pagination } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PATH } from "../../router/Router";
import { useSearchUserListQuery } from "../../services/hooks/useSearchUserListQuery";
import UserListTable from "./components/UserListTable";

const { Search } = Input;

const SearchUserListPage = () => {
  const navigate = useNavigate();
  const { page = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    userList,
    totalCount = "0",
    isLoading,
  } = useSearchUserListQuery({
    query,
    pageNumber: page,
  });

  const onSearch = (value: string) => {
    navigate(`${PATH.USER_LIST_SEARCH()}?query=${value}`);
  };

  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} />
      <UserListTable userList={userList} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          total={parseInt(totalCount)}
          pageSize={20}
          current={parseInt(page)}
          onChange={(page) => {
            navigate(`${PATH.USER_LIST_SEARCH(page + "")}?query=${query}`);
          }}
        />
      )}
    </>
  );
};

export default SearchUserListPage;