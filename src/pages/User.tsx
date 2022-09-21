import styled from "styled-components";

const User = () => {
  return (
    <UserContainer>
      <UserInfoTitle>사용자 정보</UserInfoTitle>
      <InfoTable>
        <InfoRow>
          <InfoColumn>이름</InfoColumn>
          <InfoColumn>주소</InfoColumn>
          <InfoColumn>혜택정보 수신</InfoColumn>
        </InfoRow>
        <InfoRow>
          <InfoColumn>이름</InfoColumn>
          <InfoColumn>주소</InfoColumn>
          <InfoColumn>혜택정보 수신</InfoColumn>
        </InfoRow>
        <InfoRow>
          <InfoColumn>이름</InfoColumn>
          <InfoColumn>주소</InfoColumn>
          <InfoColumn>혜택정보 수신</InfoColumn>
        </InfoRow>
        <InfoRow>
          <InfoColumn>이름</InfoColumn>
          <InfoColumn>주소</InfoColumn>
          <InfoColumn>혜택정보 수신</InfoColumn>
        </InfoRow>
        <InfoRow>
          <InfoColumn>이름</InfoColumn>
          <InfoColumn>주소</InfoColumn>
          <InfoColumn>혜택정보 수신</InfoColumn>
        </InfoRow>
        <InfoRow>
          <InfoColumn>이름</InfoColumn>
          <InfoColumn>주소</InfoColumn>
          <InfoColumn>혜택정보 수신</InfoColumn>
        </InfoRow>
      </InfoTable>
      <AccountTitleBox>
        <AccountTitle></AccountTitle>
      </AccountTitleBox>
    </UserContainer>
  );
};

export default User;

const UserContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const UserInfoTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const InfoTable = styled.table`
  margin-top: 30px;
`;

const InfoRow = styled.td`
  width: 200px;
  &:nth-child(even) {
    background-color: white;
  }
`;

const InfoColumn = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  padding: 30px 40px;
`;
const AccountTitleBox = styled.div``;

const AccountTitle = styled(UserInfoTitle)``;
