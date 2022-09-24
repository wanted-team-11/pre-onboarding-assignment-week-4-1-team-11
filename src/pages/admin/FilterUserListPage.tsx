import { Input, Pagination, Select } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PATH } from "../../router/Router";
import { useFilterUserListQuery } from "../../services/hooks/userFilterUserListQuery";
import Filter from "./components/Filter";
import UserListTable from "./components/UserListTable";

const { Search } = Input;

const FilterUserListPage = () => {
  const navigate = useNavigate();
  const { page = "1" } = useParams();
  const [searchParams] = useSearchParams();
  const filtersParams = [
    searchParams.get("at") || "",
    searchParams.get("af") || "",
    searchParams.get("st") || "",
    searchParams.get("sf") || "",
  ];

  const getFilterQueryPpap = ([at, af, st, sf]: string[]) => {
    const is_active_true = at === "on" ? "&at=on" : "";
    const is_active_false = af === "on" ? "&af=on" : "";
    const is_staff_true = st === "on" ? "&st=on" : "";
    const is_staff_false = sf === "on" ? "&sf=on" : "";
    return (
      "?" + is_active_true + is_active_false + is_staff_true + is_staff_false
    );
  };

  const getFilterQueryFromParams = ([at, af, st, sf]: string[]) => {
    const is_active_true = at === "on" ? "&is_active=true" : "";
    const is_active_false = af === "on" ? "&is_active=false" : "";
    const is_staff_true = st === "on" ? "&is_staff=true" : "";
    const is_staff_false = sf === "on" ? "&is_staff=false" : "";
    return (
      "?" + is_active_true + is_active_false + is_staff_true + is_staff_false
    );
  };

  const {
    userList,
    totalCount = "0",
    isLoading,
  } = useFilterUserListQuery({
    filter: getFilterQueryFromParams(filtersParams),
    pageNumber: page,
  });

  const onSearch = (value: string) => {
    navigate(`${PATH.SEARCH_USER_LIST()}?query=${value}`);
  };

  return (
    <>
      <Filter />
      <Search placeholder="input search text" onSearch={onSearch} />
      <UserListTable userList={userList} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          total={parseInt(totalCount)}
          pageSize={20}
          current={parseInt(page)}
          onChange={(page) => {
            navigate(
              `${PATH.FILTER_USER_LIST(page + "")}${getFilterQueryPpap(
                filtersParams
              )}`
            );
          }}
        />
      )}
    </>
  );
};

export default FilterUserListPage;
