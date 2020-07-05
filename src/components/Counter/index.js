import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlusCounter from '../../icons/PlusCounter.svg'
import MinusCounter from '../../icons/MinusCounter.svg'

import toggleCounterAction from '../../redux/toggleCounter'
import selectCounterAction from '../../redux/selectCounter'
import deselectCounterAction from '../../redux/deselectCounter'
import {
  getCountersToggleError, getCountersTogglePending, getCountersToggleId, getSelectedCounter,
} from '../../redux/reducers'

class Counter extends PureComponent {
  static propTypes = {
    counter: PropTypes.object.isRequired,
    toggleCounter: PropTypes.func.isRequired,
    isProcessingToggle: PropTypes.bool.isRequired,
    pendingToggle: PropTypes.bool.isRequired,
    selectCounter: PropTypes.func.isRequired,
    deselectCounter: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  handleDecreaseClick = (e) => {
    e.stopPropagation()
    const { toggleCounter, counter } = this.props
    toggleCounter({ id: counter.id, isIncrease: false })
  }

  handleIncreaseClick = (e) => {
    e.stopPropagation()
    const { toggleCounter, counter } = this.props
    toggleCounter({ id: counter.id, isIncrease: true })
  }

  handleCounterClick = () => {
    const {
      selectCounter, counter, isSelected, deselectCounter,
    } = this.props
    if (isSelected) {
      deselectCounter()
    } else {
      selectCounter(counter.id)
    }
  }

  render() {
    const {
      counter, isSelected, isProcessingToggle,
    } = this.props

    return (
      <Row
        isSelected={isSelected}
        onClick={this.handleCounterClick}
        data-testid="Counters__counter-element">
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

const mapStateToProps = (state, ownProps) => ({
  errorToggle: getCountersToggleError(state),
  pendingToggle: getCountersTogglePending(state),
  toggleId: getCountersToggleId(state),
  isProcessingToggle: getCountersToggleId(state) === ownProps.counter.id
    && getCountersTogglePending(state),
  isSelected: getSelectedCounter(state) === ownProps.counter.id,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleCounter: toggleCounterAction,
  selectCounter: selectCounterAction,
  deselectCounter: deselectCounterAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

const Row = styled.div`
  display: flex;
  min-height: 39px;
  color: #212121;
  margin-top: 12px;
  padding-top: 16px;

  background: ${(props) => (props.isSelected ? '#ff950040' : 'inherit')};
  border-radius: ${(props) => (props.isSelected ? '6px' : 'inherit')};
`

const CounterTitle = styled.div`
  display: flex;
  text-align: start;
  flex: 1;
  padding: 0 8px;
`

const CountContainer = styled.div`
  display: flex;
  width: 80px;
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
