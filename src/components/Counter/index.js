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
      const { counter } = this.props
      return (
        <Row>
          <CounterTitle>
            {counter.title}
          </CounterTitle>
          <CountContainer>
            <Toggle>
              <MinusCounter />
            </Toggle>
            <Value>
              {counter.count}
            </Value>
            <Toggle>
              <PlusCounter />
            </Toggle>
          </CountContainer>
        </Row>
      )
    }
}

const Row = styled.div`
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

const CountContainer = styled.div`
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
