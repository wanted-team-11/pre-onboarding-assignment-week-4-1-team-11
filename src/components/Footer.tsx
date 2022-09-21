import { Layout } from "antd";
import styled from "styled-components";

const { Footer: _Footer } = Layout;

const Footer = () => {
  return <AntFooter>Copyright © December and Company Inc.</AntFooter>;
};

export default Footer;

const AntFooter = styled(_Footer)`
  background-color: white;
  text-align: center;
`;
