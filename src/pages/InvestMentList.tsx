import styled from "styled-components";
import { useEffect, useState } from "react";
import { tokenStorage } from "../storage/tokenStorage";

const InvestmentList = () => {
  const [accountData, setAccountData] = useState([]);
  useEffect(() => {
    fetch("/accounts", {
      headers: {
        Authorization: `Bearer ${tokenStorage.get("acessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAccountData(data));
  }, []);

  console.log(accountData);
  return (
    <InvestmentListContainer>
      <InvestmentTable>
        <TableHead>
          <TableRow>
            <TableTitle>증권사</TableTitle>
            <TableTitle>계좌번호</TableTitle>
            <TableTitle>고객명</TableTitle>
            <TableTitle>운용상태</TableTitle>
            <TableTitle>계약원금</TableTitle>
            <TableTitle>예수금</TableTitle>
            <TableTitle>총자산</TableTitle>
            <TableTitle>평가손익</TableTitle>
            <TableTitle>수익률</TableTitle>
            <TableTitle>상품명</TableTitle>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountData.map((el: any) => {
            return (
              <>
                <TableRow>
                  <TableColumn>{el.status}</TableColumn>
                  <TableColumn>계좌번호</TableColumn>
                  <TableColumn>고객명</TableColumn>
                  <TableColumn>운용상태</TableColumn>
                  <TableColumn>계약원금</TableColumn>
                  <TableColumn>예수금</TableColumn>
                  <TableColumn>총자산</TableColumn>
                  <TableColumn>평가손익</TableColumn>
                  <TableColumn>수익률</TableColumn>
                  <TableColumn>상품명</TableColumn>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </InvestmentTable>
    </InvestmentListContainer>
  );
};

export default InvestmentList;

const InvestmentListContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const InvestmentTable = styled.table`
  width: 100%;
  border: 1px solid gray;
`;

const TableHead = styled.thead``;

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

const TableBody = styled.tbody``;
