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
      color: #4A4A4A;
      height: 100vh;  
      height: calc((var(--vh, 1vh) * 100) - 36px);
    }

    #root {
      height: 100%;
      @media (min-width: 768px){
        display: flex;
        justify-content: center;
      }
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
    font-family: Avenir Next, Helvetica, Sans-Serif;
    width: -webkit-fill-available;
    outline: 0;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    height: 44px;
    padding-left: 12px;

    &::placeholder {
      color: #888B90;
      font-style: normal;
    }
    &:disabled {
      color: #888B90;
    }
  }

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 23px;
    margin: 0;
    color: #000000;
  }

  .ReactModal__Content {
    @media (min-width: 768px) {
      /* Hate to use !important but react-modal wont take my class into account */
      left: 20%!important;
      width: 60%!important;
      top: 44px!important;
      bottom: 44px!important;
      border-radius: 16px!important;
      height: unset!important;
    }
  }
`

export default GlobalStyle
