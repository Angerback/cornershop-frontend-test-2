import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlusCounter from '../../icons/PlusCounter.svg'
import MinusCounter from '../../icons/MinusCounter.svg'
import Alert from '../AlertModal'

import toggleCounterAction from '../../redux/toggleCounter'
import selectCounterAction from '../../redux/selectCounter'
import deselectCounterAction from '../../redux/deselectCounter'
import { toggleCountersErrorClearAction } from '../../redux/clearError'
import {
  getCountersToggleError, getCountersTogglePending, getCountersToggleId, getSelectedCounter,
} from '../../redux/reducers'

class Counter extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isToggleErrorModalOpen: false,
    }
  }

  static propTypes = {
    counter: PropTypes.object.isRequired,
    toggleCounter: PropTypes.func.isRequired,
    isProcessingToggle: PropTypes.bool.isRequired,
    toggleId: PropTypes.string.isRequired,
    errorToggle: PropTypes.object,
    pendingToggle: PropTypes.bool.isRequired,
    selectCounter: PropTypes.func.isRequired,
    deselectCounter: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    clearToggleError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorToggle: null,
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

  errorModalCloseHandler = () => {
    const { clearToggleError } = this.props
    clearToggleError()
  }

  getDesiredUpdate = () => {
    const { errorToggle, counter, toggleId } = this.props
    if (errorToggle && toggleId === counter.id) {
      return errorToggle.isIncrease ? counter.count + 1 : counter.count - 1
    }
    return 0
  }

  render() {
    const {
      counter, isSelected, isProcessingToggle, errorToggle, toggleId,
    } = this.props

    const isToggleErrorModalOpen = (errorToggle && (toggleId === counter.id)) || false

    const desiredUpdate = this.getDesiredUpdate()

    return (
      <Fragment>
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
        <Alert
          isOpen={isToggleErrorModalOpen}
          closeHandler={this.errorModalCloseHandler}
          title={`Couldn't update "${counter.title}" to ${desiredUpdate}`}
          message="The Internet connection appears to be offline."
          primaryButtonText="Retry"
          primaryButtonHandler={errorToggle && errorToggle.isIncrease
            ? this.handleIncreaseClick
            : this.handleDecreaseClick}
          secondaryButtonText="Dismiss"
          secondaryButtonHandler={this.errorModalCloseHandler}
        />
      </Fragment>
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
  clearToggleError: toggleCountersErrorClearAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

const Row = styled.div`
  display: flex;
  min-height: 39px;
  color: #212121;
  margin-top: 12px;
  padding-top: 16px;
  cursor: pointer;
  border-radius: 6px;
  background: ${(props) => (props.isSelected ? '#ff950040' : 'inherit')};

  &:hover {
    background: ${(props) => (!props.isSelected ? '#0000000a' : '#ff950040')};
  }
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
