import React from 'react';
import styled from 'styled-components';
import { Broker, AccountData } from '../types/content.type';

interface AccountTableProps {
  data: AccountData[];
}

const AccountListTable = ({ data }: AccountTableProps) => {
  return (
    <MainTable>
      <colgroup>
        <col width="10%" span={9} />
      </colgroup>
      <TableHeader>
        <tr>
          {COLUMS_DATA.map(({ id, title }) => (
            <th key={id}>{title}</th>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((el: AccountData, i: number) => (
          <tr key={i}>
            <td>고객명</td>
            <td>{BROKERS_DATA[el.broker_id]}</td>
            <td>{el.number}</td>
            <td>
              {el.status === 1
                ? '입금대기'
                : el.status === 2
                ? '운용중'
                : el.status === 3
                ? '투자중지'
                : el.status === 4
                ? '해지'
                : '관리자확인필요'}
            </td>
            <td>{el.name}</td>
            <td>
              {`${parseInt(el.assets)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₩`}
            </td>
            <td>{`${parseInt(el.payments)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ₩`}</td>
            <td>{el.is_active ? 'O' : 'X'}</td>
            <td>{new Date(el.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </TableBody>
    </MainTable>
  );
};

export default AccountListTable;

const BROKERS_DATA: Broker = {
  '209': '유안타증권',
  '218': '현대증권',
  '230': '미래에셋증권',
  '238': '대우증권',
  '240': '삼성증권',
  '243': '한국투자증권',
  '247': '우리투자증권',
  '261': '교보증권',
  '262': '하이투자증권',
  '263': 'HMC투자증권',
  '264': '키움증권',
  '265': '이베스트투자증권',
  '266': 'SK증권',
  '267': '대신증권',
  '268': '아이엠투자증권',
  '269': '한화투자증권',
  '270': '하나대투자증권',
  '279': '동부증권',
  '280': '유진투자증권',
  '288': '카카오페이증권',
  '287': '메리츠종합금융증권',
  '290': '부국증권',
  '291': '신영증권',
  '292': 'LIG투자증권',
  '271': '토스증권',
};

const COLUMS_DATA = [
  {
    id: 1,
    title: '이름',
  },
  {
    id: 2,
    title: '브로커 명',
  },
  {
    id: 3,
    title: '계좌번호',
  },
  {
    id: 4,
    title: '계좌 상태',
  },
  {
    id: 5,
    title: '계좌 명',
  },
  {
    id: 6,
    title: '평가 금액',
  },
  {
    id: 7,
    title: '입금 금액',
  },
  {
    id: 8,
    title: '계좌 활성화여부',
  },
  {
    id: 9,
    title: '개설일',
  },
];

const MainTable = styled.table`
  width: inherit;
`;

const TableHeader = styled.thead`
  th {
    border: 1px solid lightgray;
    background-color: gray;
    padding: 10px;
    vertical-align: middle;
  }
`;

const TableBody = styled.tbody`
  td {
    border: 1px solid gray;
    background-color: white;
    padding: 3px;
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const AdminButtons = styled.td`
  text-align: center;
  vertical-align: middle;
  svg {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  svg:first-child {
    color: rgba(0, 0, 0, 0.3);
    margin-right: 10px;
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
  svg:last-child {
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;
