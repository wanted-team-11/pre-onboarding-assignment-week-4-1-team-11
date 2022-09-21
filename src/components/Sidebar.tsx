import { useNavigate } from "react-router-dom";
import { Layout, Menu as _Menu } from "antd";
import styled from "styled-components";

const { Sider: _Sider } = Layout;

const items = [
  { label: "account list", key: "account-list" },
  { label: "account detail", key: "account-detail" },
  { label: "user list", key: "user-list" },
  { label: "user detail", key: "user-detail" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const changePage = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider>
      <Menu mode="inline" theme="dark" items={items} onClick={changePage} />
    </Sider>
  );
};

export default Sidebar;

const Sider = styled(_Sider)`
  color: white;
  display: flex;
  justify-content: center;
  & > * {
    flex-grow: 1;
  }
`;

const Menu = styled(_Menu)`
  margin-top: 20px;
  width: 100%;
`;
