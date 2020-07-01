import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
  body {
      margin: 0;
      padding: 0;
      background: #FFFFFF;
      font-family: Avenir Next, Helvetica, Sans-Serif;
      font-style: normal;
      font-weight: normal;
      font-size: 17px;
      line-height: 23px;
      text-align: center;
      color: #4A4A4A;
      height: 100vh;  
      height: calc((var(--vh, 1vh) * 100) - 36px);
    }

    #root {
      height: 100%;
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

  input {
    width: -webkit-fill-available;
    outline: 0;
    background: #FFFFFF;
  }
`
 
export default GlobalStyle