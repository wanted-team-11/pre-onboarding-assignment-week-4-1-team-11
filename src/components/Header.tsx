import styled from "styled-components";
import { BiListUl, BiBell } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitleBox>
        <ListImg />
        <HeaderTitle>투자 계좌</HeaderTitle>
      </HeaderTitleBox>
      <HeaderItemBox>
        <UserNameText>계발</UserNameText>
        <BsQuestionCircle />
        <BiBell />
        <UserImage />
      </HeaderItemBox>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 20px;
  border-bottom: 2px solid gray;
`;

const HeaderTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

const ListImg = styled(BiListUl)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const HeaderTitle = styled.h1``;

const HeaderItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  font-size: 20px;
`;

const UserNameText = styled.h1``;

const UserImage = styled.img`
  width: 20px;
  height: 20px;
  background-color: black;
`;
