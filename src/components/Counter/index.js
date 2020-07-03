import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlusCounter from '../../icons/PlusCounter.svg'
import MinusCounter from '../../icons/MinusCounter.svg'

import toggleCounterAction from '../../redux/toggleCounter'
import { getCountersToggleError, getCountersTogglePending, getCountersToggleId } from '../../redux/reducers'

class Counter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  static propTypes = {
    counter: PropTypes.object.isRequired,
    toggleCounter: PropTypes.func.isRequired,
    toggleId: PropTypes.string.isRequired,
    pendingToggle: PropTypes.bool.isRequired,
  }

  handleDecreaseClick = () => {
    const { toggleCounter, counter } = this.props
    toggleCounter({ id: counter.id, isIncrease: false })
  }

  handleIncreaseClick = () => {
    const { toggleCounter, counter } = this.props
    toggleCounter({ id: counter.id, isIncrease: true })
  }

  render() {
    const { counter, toggleId, pendingToggle } = this.props
    const isProcessingToggle = counter.id === toggleId && pendingToggle
    return (
      <Row data-testid="Counters__counter-element">
        <CounterTitle>
          {counter.title}
        </CounterTitle>
        <CountContainer>
          <Toggle
            onClick={this.handleDecreaseClick}
            disabled={counter.count === 0 || isProcessingToggle}
            data-testid="Counters__counter-decrease"
          >
            <MinusCounter />
          </Toggle>
          <Value data-testid="Counters__counter-value">
            {counter.count}
          </Value>
          <Toggle
            onClick={this.handleIncreaseClick}
            disabled={isProcessingToggle}
            data-testid="Counters__counter-increase"
          >
            <PlusCounter />
          </Toggle>
        </CountContainer>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  errorToggle: getCountersToggleError(state),
  pendingToggle: getCountersTogglePending(state),
  toggleId: getCountersToggleId(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleCounter: toggleCounterAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

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
  align-items: baseline;
`

const Toggle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;

  &:disabled svg {
    fill: #DCDCDF;
  }
`
const Value = styled.div`
  flex: 1;
`
