import { useEffect } from "react";
import { getRefinedUserInfoListThunk } from "../store/user-list.reducer";
import { useAppDispatch, useAppSelector } from "../store";

import UsersTable from "../components/UsersTable";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";

const UserListPage = () => {
  const dispatch = useAppDispatch();

  const { userList, isLoading, isError, userCount } = useAppSelector(
    (state) => state.userList
  );
  const users = userList.map((user) => ({
    ...user,
    key: user.uuid,
  }));

  useEffect(() => {
    (async () => {
      dispatch(getRefinedUserInfoListThunk({ pageNumber: 1 }));
    })();
  }, []);

  const onSearch = (searchWord: string) => {
    dispatch(getRefinedUserInfoListThunk({ userName: searchWord }));
  };

  const onPageClick = async (pageNumber: number) => {
    dispatch(getRefinedUserInfoListThunk({ pageNumber }));
  };

  if (isError) {
    return <div>Oops, something went wrong...</div>;
  }

  return (
    <>
      <SearchInput onSearch={onSearch} />
      <UsersTable data={users} isLoading={isLoading} />
      <PaginationComponent total={userCount} onPageClick={onPageClick} />
    </>
  );
};

export default UserListPage;
