import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    color: #000000;
  }

  body {
    margin: 0;
    padding: 0;
    background: #E5E5E5;
    font-family: Avenir, Helvetica, Sans-Serif;
  }
`
 
export default GlobalStyle