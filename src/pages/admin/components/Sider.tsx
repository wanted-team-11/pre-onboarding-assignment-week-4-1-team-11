import { LineChartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../router/Router";
import { StorageKey, tokenStorage } from "../../../storage";

const { Sider: SiderAndt } = Layout;

const Sider = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "user-list",
      icon: <UserOutlined />,
      label: <Link to={PATH.USER_LIST()}>사용자 목록</Link>,
    },
    {
      key: "account-list",
      icon: <LineChartOutlined />,
      label: <Link to={PATH.ACCOUNT_LIST()}>계좌목록</Link>,
    },
  ];

  const selectedMenu = () => {
    if (pathname.includes("detail")) return "0";
    else return menuItems.find(({ key }) => pathname.includes(key))!.key;
  };

  return (
    <SiderAndt
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className="logo"
        style={{
          height: "32px",
          margin: "16px",
          backgroundImage: `url("/logo.svg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <Menu
        theme="dark"
        selectedKeys={[selectedMenu()]}
        mode="inline"
        items={menuItems}
      />
      <Divider style={{ backgroundColor: "#424242", height: "1px" }} />
      <Popconfirm
        placement="top"
        title={"로그아웃 하시겠습니까?"}
        onConfirm={() => {
          tokenStorage.remove(StorageKey.ACCESS_TOKEN);
          navigate("/");
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ width: "100%" }} type="link" danger>
          로그아웃
        </Button>
      </Popconfirm>
    </SiderAndt>
  );
};

export default Sider;
