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
        <Row data-testid="Counters__counter-element">
          <CounterTitle>
            {counter.title}
          </CounterTitle>
          <CountContainer>
            <Toggle disabled={counter.count === 0}><MinusCounter /></Toggle>
            <Value>
              {counter.count}
            </Value>
            <Toggle><PlusCounter /></Toggle>
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
  text-align: center;
`

const Toggle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  padding-top: 4px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 33%;
  display: flex;
  justify-content: center;

  &:disabled svg {
    fill: #DCDCDF;
  }
`
const Value = styled.div`
  flex: 1;
`
