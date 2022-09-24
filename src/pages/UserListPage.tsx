import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRefinedUserInfoListThunk } from "../store/user-list.reducer";
import { useAppDispatch, useAppSelector } from "../store";

import UsersTable from "../components/UsersTable";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";

const UserListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { page } = useParams();

  const { userList, isLoading, isError, userCount } = useAppSelector(
    (state) => state.userList
  );
  const users = userList.map((user) => ({
    ...user,
    key: user.uuid,
  }));

  useEffect(() => {
    const pageNumber = page ? parseInt(page) : 1;
    dispatch(getRefinedUserInfoListThunk({ pageNumber }));
  }, []);

  useEffect(() => {
    if (page) {
      dispatch(getRefinedUserInfoListThunk({ pageNumber: parseInt(page) }));
    }
  }, [page]);

  const onSearch = (searchWord: string) => {
    dispatch(getRefinedUserInfoListThunk({ userName: searchWord }));
  };

  const onPageClick = async (pageNumber: number) => {
    navigate(`/user-list/${pageNumber}`);
  };

  if (isError) {
    return (
      <div>Oops, something went wrong... probably access token's expired</div>
    );
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
