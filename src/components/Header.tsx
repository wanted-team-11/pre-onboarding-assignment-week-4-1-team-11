import styled from "styled-components";
import { Layout, Button as _Button } from "antd";
import { ReactComponent as CompanyLogo } from "../assets/react-logo.svg";

const { Header: _AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader>
      <Logo />
      <Label>this is header text</Label>
    </AntHeader>
  );
};

export default Header;

const AntHeader = styled(_AntHeader)`
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
`;

const Logo = styled(CompanyLogo)`
  position: absolute;
  left: 0;
  width: 40px;
  margin: 0 15px;
`;

const Label = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;
`;
