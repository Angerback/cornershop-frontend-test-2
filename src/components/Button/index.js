import styled from 'styled-components'

const themes = {
  primary: {
    textColor: '#FFFFFF',
    bgColor: '#FF9500'
  },
  secondary: {
    textColor: '#FF9500',
    bgColor: '#FFFFFF'
  },
}

const getTheme = theme => {
  return themes[theme] ? themes[theme] : themes.primary}

const BaseButton = styled.button`
    padding: 8px 24px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: ${props => getTheme(props.theme).bgColor};
    color: ${props => getTheme(props.theme).textColor};
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
`

export default BaseButton