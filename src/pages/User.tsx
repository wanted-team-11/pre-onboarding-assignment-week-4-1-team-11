import { useEffect, useState } from "react";
import styled from "styled-components";
import { tokenStorage } from "../storage/tokenStorage";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";

const User = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [userData, setUserData] = useState([]);
  const [settingData, setSettingData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("/users", {
      headers: {
        Authorization: `Bearer ${tokenStorage.get("acessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));

    fetch("/userSetting", {
      headers: {
        Authorization: `Bearer ${tokenStorage.get("acessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSettingData(data));
    fetch("/accounts", {
      headers: {
        Authorization: `Bearer ${tokenStorage.get("acessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAccountData(data));
  }, []);

  const MergeArray: any[] = [];
  let pattern = /^(19|20)d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
  userData.map((el: any) => {
    settingData.map((other: any) => {
      if (el.uuid === other.uuid) {
        return MergeArray.push({ ...el, ...other });
      }
    });
  });

  console.log(userData);

  return (
    <UserContainer>
      <UserTable>
        <TableHead>
          <TableRow>
            <TableTitle>고객이름</TableTitle>
            <TableTitle>보유 계좌수</TableTitle>
            <TableTitle>이메일</TableTitle>
            <TableTitle>성별</TableTitle>
            <TableTitle>생년월일</TableTitle>
            <TableTitle>최근 로그인</TableTitle>
            <TableTitle>혜택 동의 여부</TableTitle>
            <TableTitle>활성화 여부</TableTitle>
            <TableTitle>가입일</TableTitle>
          </TableRow>
        </TableHead>
        <TableBody>
          {MergeArray.map((data: any) => {
            return (
              <TableRow key={data.created_at}>
                <TableColumn>{data.name}</TableColumn>
                <TableColumn>계좌</TableColumn>
                <TableColumn>{data.email}</TableColumn>
                <TableColumn>
                  {data.gender_origin === 1 || data.gender_origin === 3
                    ? "남"
                    : "여"}
                </TableColumn>
                <TableColumn>
                  {new Date(data.birth_date).toLocaleString()}
                </TableColumn>
                <TableColumn>
                  {new Date(data.updated_at).toLocaleString()}
                </TableColumn>
                <TableColumn>{data.allow_Invest_push ? "O" : "X"}</TableColumn>
                <TableColumn>{data.is_active ? "O" : "X"}</TableColumn>
                <TableColumn>
                  {new Date(data.created_at).toLocaleString()}
                </TableColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </UserTable>
      <Pagination
        total={posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </UserContainer>
  );
};

export default User;

const UserContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const UserTable = styled.table``;

const TableHead = styled.thead``;
const TableBody = styled.tbody``;

const TableTitle = styled.th`
  padding: 20px 25px;
  background-color: white;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  padding: 20px;
  background-color: white;
`;

const TableColumn = styled.td`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
`;

const PageButton = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
`;
