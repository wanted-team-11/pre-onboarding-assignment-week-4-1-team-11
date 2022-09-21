import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    font-family: sans-serif;
  }
`;

export default GlobalStyle;
