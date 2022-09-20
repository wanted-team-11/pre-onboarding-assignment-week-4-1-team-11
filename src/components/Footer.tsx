import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>Copyright &copy; December and Company Inc.</FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #666;
  font-size: 20px;
`;
