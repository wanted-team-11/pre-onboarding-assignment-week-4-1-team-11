import styled from "styled-components";
import { MdOutlineAccountBalance } from "react-icons/md";
import { GoDashboard } from "react-icons/go";
import { HiChevronDown } from "react-icons/hi";
import { BiUser, BiLogOutCircle } from "react-icons/bi";
import { IconBase } from "react-icons/lib";

const Sider = () => {
  return (
    <SiderContainer>
      <SiderTitle>PREFACE</SiderTitle>
      <SiderListBox>
        {SIDER_LIST.sider.map(({ name, icon, id }) => {
          return (
            <>
              <ListItem key={id}>
                {icon} &nbsp;
                {name}
              </ListItem>
            </>
          );
        })}
      </SiderListBox>
    </SiderContainer>
  );
};

export default Sider;

const SiderContainer = styled.div`
  width: 300px;
  background-color: #041527;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const SiderTitle = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 40px;
  color: white;
`;

const SiderListBox = styled.div``;

const ListItem = styled.div`
  display: flex;

  font-size: 25px;
  color: gray;
  padding: 20px;
  &: hover {
    background-color: #458ff7;
    color: white;
  }
`;

const SIDER_LIST = {
  sider: [
    { id: 1, name: "대시보드", keyword: "dashbaord", icon: <GoDashboard /> },
    {
      id: 2,
      name: "계좌 목록",
      keyword: "accounts",
      icon: <MdOutlineAccountBalance />,
    },
    { id: 3, name: "사용자 목록", keyword: "users", icon: <BiUser /> },
    { id: 9999, name: "로그아웃", keyword: "logout", icon: <BiLogOutCircle /> },
  ],
};
