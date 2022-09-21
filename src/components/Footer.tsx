import { Layout } from "antd";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>Copyright © December and Company Inc.</FooterContainer>
  );
}

const FooterContainer = styled(Layout.Footer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
