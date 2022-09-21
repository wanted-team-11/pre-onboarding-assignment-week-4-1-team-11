import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "antd/dist/antd.min.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

export default GlobalStyle;
