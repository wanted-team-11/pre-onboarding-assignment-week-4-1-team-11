import { useEffect } from "react";
import { getRefinedUserInfoThunk } from "../store/user-list.reducer";
import { useAppDispatch, useAppSelector } from "../store";

import UsersTable from "../components/UsersTable";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";

const UserListPage = () => {
  const dispatch = useAppDispatch();

  const { userList, isLoading, isError } = useAppSelector(
    (state) => state.userList
  );
  const users = userList.map((user) => ({
    ...user,
    key: user.uuid,
  }));

  useEffect(() => {
    (async () => {
      dispatch(getRefinedUserInfoThunk({ pageNumber: 1 }));
    })();
  }, []);

  const onSearch = (searchWord: string) => {
    dispatch(getRefinedUserInfoThunk({ userName: searchWord }));
  };

  const onPageClick = async (pageNumber: number) => {
    dispatch(getRefinedUserInfoThunk({ pageNumber }));
  };

  if (isError) {
    return <div>Oops, something went wrong...</div>;
  }

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <SearchInput onSearch={onSearch} />
          <UsersTable data={users} />
        </>
      )}
      <PaginationComponent onPageClick={onPageClick} />
    </>
  );
};

export default UserListPage;
