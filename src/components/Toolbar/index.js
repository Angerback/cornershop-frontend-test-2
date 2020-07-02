/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'

import styled from 'styled-components'
import Button from '../Button'
import PlusIcon from '../../icons/Plus.svg'

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`

export default class Toolbar extends Component {
  render() {
    return (
      <ButtonWrapper>
        <Separator />
        <Button theme="primary" data-testid="Toolbar_addCounterButton">
          <PlusIcon style={{
            marginBottom: '-4px',
          }}/>
        </Button>
      </ButtonWrapper>
    )
  }
}
