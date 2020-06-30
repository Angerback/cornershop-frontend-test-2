import React, { PureComponent, Fragment } from 'react'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as AppIcon } from '../../icons/appIcon.svg'
import Button from '../../components/Button'

const TextPageWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10vh 10vw;
`
export default class WelcomePage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      start: false
    }
  }

  handleStartClick = () => {
    this.setState({start: true})
  }

  render() {
    const {start} = this.state
    return (
      <TextPageWrapper>
        {start ? (<Redirect to="/main" />) : (
          <Fragment>
            <AppIcon style={{
              marginBottom: '10vh',
              height: '25vh',
            }} />
            <h1>Welcome to Counters</h1>
            <p style={{marginBottom: '15vh'}}>Capture cups of lattes, frapuccinos, or anything else that can be counted.</p>
            <Button onClick={this.handleStartClick} theme="primary">Get started!</Button>
          </Fragment>
        )}
      </TextPageWrapper>
    )
  }
}
