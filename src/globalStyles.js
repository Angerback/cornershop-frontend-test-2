import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
  body {
      margin: 0;
      padding: 0;
      background: #E5E5E5;
      font-family: Avenir Next, Helvetica, Sans-Serif;
    }
  
  button {
    font-family: Avenir Next, Helvetica, Sans-Serif;
  }

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    color: #000000;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 23px;
    text-align: center;
    color: #4A4A4A;
  }

  
`
 
export default GlobalStyle