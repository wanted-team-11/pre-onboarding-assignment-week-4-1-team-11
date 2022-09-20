import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { IColumn, IData } from '../types/content.type';
import { useNavigate } from 'react-router-dom';

interface TableProps {
  data: IData[];
}

const UserListTable = ({ data }: TableProps) => {
  const navigate = useNavigate();

  const goToDetail = (path: string | number, name: string) => {
    navigate(`/content/users/${path}?q=${name}`);
  };

  return (
    <MainTable>
      <colgroup>
        <col width="9.3%" span={11} />
      </colgroup>
      <TableHeader>
        <tr>
          {COLUMS_DATA.map(({ id, title }: IColumn) => (
            <th key={id}>{title}</th>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((el: IData, i: number) => (
          <tr
            key={i}
            onClick={() => {
              goToDetail(el.id, el.name);
            }}
          >
            <td>{el.name}</td>
            <td>{el.account_count}</td>
            <td>{el.email}</td>
            <td>
              {el.gender_origin === 1 || el.gender_origin === 3
                ? '남'
                : el.gender_origin === 2 || el.gender_origin === 4
                ? '여'
                : null}
            </td>
            <td>{new Date(el.birth_date).toLocaleDateString()}</td>
            <td>
              {String(el.phone_number).replace(
                /^([0|1|6|7|8|9|]{3})-?([0-9]{3,4})-?([0-9]{4})$/,
                '$1-****-$3',
              )}
            </td>
            <td>{new Date(el.last_login).toLocaleDateString()}</td>
            <td>{el.allow_invest_push === true ? 'O' : 'X'}</td>
            <td>{el.is_active === true ? 'O' : 'X'}</td>
            <td>{new Date(el.created_at).toLocaleDateString()}</td>
            <AdminButtons>
              <FontAwesomeIcon icon={faUserPen} />
              <FontAwesomeIcon icon={faTrash} />
            </AdminButtons>
          </tr>
        ))}
      </TableBody>
    </MainTable>
  );
};

const COLUMS_DATA = [
  {
    id: 1,
    title: '이름',
  },
  {
    id: 2,
    title: '보유 계좌 수',
  },
  {
    id: 3,
    title: '이메일',
  },
  {
    id: 4,
    title: '성별 코드',
  },
  {
    id: 5,
    title: '생년월일',
  },
  {
    id: 6,
    title: '핸드폰 번호',
  },
  {
    id: 7,
    title: '최근 로그인',
  },
  {
    id: 8,
    title: '혜택 수신 동의 여부',
  },
  {
    id: 9,
    title: '활성화 여부',
  },
  {
    id: 10,
    title: '가입일',
  },
  {
    id: 11,
    title: '관리',
  },
];

export default UserListTable;

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
