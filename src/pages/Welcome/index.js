import React, { Component } from 'react'
import styled from 'styled-components'
import { ReactComponent as AppIcon } from '../../icons/appIcon.svg'
import Button from '../../components/Button'

const TextPageWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10vh 10vw;
`
export default class WelcomePage extends Component {
  render() {
    return (
      <TextPageWrapper>
        <AppIcon style={{
          marginBottom: '10vh',
          height: '25vh',
        }} />
        <h1>Welcome to Counters</h1>
        <p style={{marginBottom: '15vh'}}>Capture cups of lattes, frapuccinos, or anything else that can be counted.</p>
        <Button theme="primary">Get started!</Button>
      </TextPageWrapper>
    )
  }
}
