import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

function Footer() {
  return <MainFooter>Copyright © December and Company Inc.</MainFooter>;
}

const MainFooter = styled(Layout.Footer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
