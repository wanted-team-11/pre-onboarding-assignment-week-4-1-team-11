import { Input, Pagination, Button as _Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../router/Router";
import { useUserListQuery } from "../../services/hooks/useUserListQuery";
import Filter from "./components/Filter";
import UserListTable from "./components/UserListTable";
import NewUserDrawer from "./components/NewUserDrawer";
import styled from "styled-components";
import { useState } from "react";

const { Search } = Input;

const UserListPage = () => {
  const { page = "1" } = useParams();
  const { userList, totalUserCount = "0", isLoading } = useUserListQuery(page);
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`${PATH.SEARCH_USER_LIST()}?query=${value}`);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Filter />
      <Button type="primary" onClick={openDrawer}>
        신규 사용자
      </Button>
      <Search placeholder="input search text" onSearch={onSearch} />
      <UserListTable isLoading={isLoading} userList={userList} />
      {!isLoading && (
        <Pagination
          total={parseInt(totalUserCount)}
          pageSize={20}
          current={parseInt(page)}
          onChange={(page) => {
            navigate(PATH.USER_LIST(page + ""));
          }}
        />
      )}
      <NewUserDrawer closeDrawer={closeDrawer} open={isOpen} />
    </>
  );
};

export default UserListPage;

const Button = styled(_Button)`
  margin-bottom: 10px;
`;
