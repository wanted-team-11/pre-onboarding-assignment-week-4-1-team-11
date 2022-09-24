import { Input, Pagination } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../router/Router';
import { useUserListQuery } from '../../services/hooks/useUserListQuery';
import UserListTable from './components/UserListTable';

const { Search } = Input;

const UserListPage = () => {
  const { page = '1' } = useParams();
  const { userList, totalUserCount = '0', isLoading } = useUserListQuery(page);
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`${PATH.SEARCH_USER_LIST()}?query=${value}`);
  };

  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} />
      <UserListTable isLoading={isLoading} userList={userList} />
      {!isLoading && (
        <Pagination
          total={parseInt(totalUserCount)}
          pageSize={20}
          current={parseInt(page)}
          onChange={(page) => {
            navigate(PATH.USER_LIST(page + ''));
          }}
        />
      )}
    </>
  );
};

export default UserListPage;
