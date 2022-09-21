import { useNavigate } from "react-router-dom";
import { Layout, Menu as _Menu } from "antd";
import styled from "styled-components";
import { tokenStorage } from "../utils/storages";

const { Sider: _Sider } = Layout;

const items = [
  { label: "account list", key: "account-list" },
  { label: "user list", key: "user-list" },
  { label: "logout", key: "logout" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const changePage = ({ key }: { key: string }) => {
    if (key === "logout") {
      tokenStorage.remove();
      navigate("/login");
    } else {
      navigate(key);
    }
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
