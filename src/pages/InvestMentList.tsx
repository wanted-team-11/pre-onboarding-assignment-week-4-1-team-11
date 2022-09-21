import styled from "styled-components";

const InvestmentList = () => {
  return (
    <InvestmentListContainer>
      <InvestmentTable>
        <TableHead>
          <TableColumn>
            <TableRow>증권사</TableRow>
            <TableRow>계좌번호</TableRow>
            <TableRow>고객명</TableRow>
            <TableRow>운용상태</TableRow>
            <TableRow>계약원금</TableRow>
            <TableRow>예수금</TableRow>
            <TableRow>총자산</TableRow>
            <TableRow>평가손익</TableRow>
            <TableRow>수익률</TableRow>
            <TableRow>상품명</TableRow>
          </TableColumn>
        </TableHead>
        <TableBody>
          <TableColumn>
            <TableRow>증권사</TableRow>
            <TableRow>계좌번호</TableRow>
            <TableRow>고객명</TableRow>
            <TableRow>운용상태</TableRow>
            <TableRow>계약원금</TableRow>
            <TableRow>예수금</TableRow>
            <TableRow>총자산</TableRow>
            <TableRow>평가손익</TableRow>
            <TableRow>수익률</TableRow>
            <TableRow>상품명</TableRow>
          </TableColumn>{" "}
          <TableColumn>
            <TableRow>증권사</TableRow>
            <TableRow>계좌번호</TableRow>
            <TableRow>고객명</TableRow>
            <TableRow>운용상태</TableRow>
            <TableRow>계약원금</TableRow>
            <TableRow>예수금</TableRow>
            <TableRow>총자산</TableRow>
            <TableRow>평가손익</TableRow>
            <TableRow>수익률</TableRow>
            <TableRow>상품명</TableRow>
          </TableColumn>{" "}
          <TableColumn>
            <TableRow>증권사</TableRow>
            <TableRow>계좌번호</TableRow>
            <TableRow>고객명</TableRow>
            <TableRow>운용상태</TableRow>
            <TableRow>계약원금</TableRow>
            <TableRow>예수금</TableRow>
            <TableRow>총자산</TableRow>
            <TableRow>평가손익</TableRow>
            <TableRow>수익률</TableRow>
            <TableRow>상품명</TableRow>
          </TableColumn>
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

const InvestmentListBox = styled.div``;

const InvestmentTable = styled.table`
  width: 100%;
  border: 1px solid gray;
`;

const TableHead = styled.thead``;

const TableColumn = styled.tr``;

const TableRow = styled.td`
  background-color: #fafafa;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  padding: 10px;
`;

const TableBody = styled.tbody``;
