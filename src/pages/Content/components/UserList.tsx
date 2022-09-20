import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  getAllAccountsData,
  getNextData,
  getUsersData,
  getAllUserSettingData,
} from '../../../api';
import storage from '../../../storage';
import UserListTable from './UserListTable';
import { IData } from '../types/content.type';

const UserList = () => {
  const [usersData, setUsersData] = useState([]);
  const [userSettingData, setUserSettingData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const token = storage.get('accessToken');

  const mergedData: IData[] = [];

  let accountCount: number[] = [];

  usersData.forEach((el: IData) => {
    let accounts = accountCount.push(
      accountsData.filter((newel: any) => {
        if (el.id === newel.user_id) {
          return true;
        } else {
          return false;
        }
      }).length,
    );
    return accounts;
  });

  usersData.forEach((el: IData, index: number) => {
    userSettingData.forEach((newel: IData) => {
      if (el.uuid === newel.uuid) {
        const result = { ...newel, ...el, account_count: accountCount[index] };
        return mergedData.push(result);
      }
    });
  });

  const saveSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setSearchValue(value);
  };

  const toNextPage = (num: number) => {
    getNextData(`${token}`, 'users', num).then((data) => {
      setUsersData(data);
    });
  };

  useEffect(() => {
    return () => {
      try {
        getUsersData(`${token}`).then((data) => {
          setUsersData(data);
        });
        getAllUserSettingData(`${token}`).then((data) => {
          setUserSettingData(data);
        });
        getAllAccountsData(`${token}`).then((data) => {
          setAccountsData(data);
        });
      } catch (err) {
        alert('데이터를 수신하는데 실패했습니다.');
        console.error(err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListWrapper>
      <form style={{ display: 'flex' }}>
        <Title>사용자 목록</Title>
        <input type="text" onChange={saveSearchValue} />
      </form>
      <UserListTable data={mergedData} />
      <ButtonContainer>
        {BUTTON_DATA.map(({ id }) => (
          <PageButton
            key={id}
            onClick={() => {
              toNextPage(id);
            }}
          >
            {id}
          </PageButton>
        ))}
      </ButtonContainer>
    </ListWrapper>
  );
};

export default UserList;

const BUTTON_DATA = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
];

const ListWrapper = styled.div``;

const Title = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-left: 480px;
`;

const PageButton = styled.button`
  cursor: pointer;
`;
