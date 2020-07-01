import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PlusCounter from '../../icons/PlusCounter.svg'
import MinusCounter from '../../icons/MinusCounter.svg'

export default class Counter extends Component {
    static propTypes = {
      counter: PropTypes.object.isRequired,
    }

    render() {
      const {counter} = this.props
      return (
        <CounterContainer>
          <CounterTitle>
            {counter.title}
          </CounterTitle>
          <CounterToggler>
            <Toggle>
              <MinusCounter />
            </Toggle>
            <Value>
              {counter.count}
            </Value>
            <Toggle>
              <PlusCounter />
            </Toggle>  
          </CounterToggler>
        </CounterContainer>
      )
    }
}

const CounterContainer = styled.div`
  display: flex;
  min-height: 39px;
  color: #212121;
  margin-top: 28px;
`

const CounterTitle = styled.div`
  display: flex;
  text-align: start;
  width: 70%;
  padding: 0 8px;
`

const CounterToggler = styled.div`
  display: flex;
  width: 30%;
  font-weight: 600;
`

const Toggle = styled.div`
  width: 33%;
`
const Value = styled.div`
  flex: 1;
`
