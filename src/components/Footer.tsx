import styled from "styled-components";
import { BiCopyright } from "react-icons/bi";
const Footer = () => {
  return (
    <FooterContainer>
      <BiCopyright /> December and Company
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #458ff7;
  height: 100px;
  font-size: 23px;
`;
