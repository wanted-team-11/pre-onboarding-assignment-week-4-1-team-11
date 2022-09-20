import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAccountsData, getNextData } from '../../../api/index';
import storage from '../../../storage/index';
import AccountListTable from './AccountListTable';
import { AccountData } from '../types/content.type';

const AccountsList = () => {
  const [accountData, setAccountData] = useState<AccountData[]>([]);

  const token = storage.get('accessToken');

  const toNextPage = (num: number) => {
    getNextData(`${token}`, 'accounts', num).then((data) => {
      setAccountData(data);
    });
  };

  useEffect(() => {
    return () => {
      getAccountsData(`${token}`).then((data) => setAccountData(data));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListWrapper>
      <Title>계좌 목록</Title>
      <AccountListTable data={accountData} />
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

export default AccountsList;

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
