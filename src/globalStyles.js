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
    margin: 10px 0;
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

  .createModalOpen {
    position: absolute;
    top: 15px;
    left: 0;
    right: auto;
    bottom: auto;
    width: 100vw;
    padding: 0;
    height: calc(100vh - 15px);
    border-radius: 16px 16px 0px 0px;
    display: flex;
    flex-direction: column;
    background-color: white;
    
    @media (min-width: 768px) {
      left: 20%;
      width: 60%;
      top: 44px;
      bottom: 44px;
      border-radius: 16px;
      height: unset;
    }
  }

  .alertModal {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    background: #FAFAFA;
    box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    position: absolute;
    padding: 15px 40px;
    width: 220px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    &:focus{
      outline: unset;
    }
  }

  .modalOverlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.50);
  }
`

export default GlobalStyle
