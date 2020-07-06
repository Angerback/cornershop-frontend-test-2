/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Popup from 'reactjs-popup'
import CreateCounterModal from '../CreateCounterModal'
import Button from '../Button'
import Alert from '../AlertModal'

import {
  getSelectedCounter, getCounters, getCountersDeletePending, getCountersDeleteError,
} from '../../redux/reducers'

import { deleteCountersErrorClearAction } from '../../redux/clearError'

import ExportIcon from '../../icons/ExportIcon.svg'
import TrashIcon from '../../icons/TrashIcon.svg'
import PlusIcon from '../../icons/Plus.svg'
import deleteCounterAction from '../../redux/deleteCounter'

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

const SelectionButtons = styled.div`
  flex: 1;
  display:flex;
  justify-content: flex-start;

  & button {
    margin-right: 18px;
  }
`
const popupContentStyle = {
  background: '#FAFAFA',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0px 24px 38px rgba(0, 0, 0, 0.14)',
  borderRadius: '10px',
  padding: '0 13px 25px',
}

const popupArrowStyle = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  borderRight: '1px solid rgba(0, 0, 0, 0.1)',
  borderBottomRightRadius: '3px',
  height: '20px',
  width: '20px',
  margin: '-10px',
  background: '#FAFAFA',
  boxShadow: 'unset',
}

class Toolbar extends PureComponent {
  static propTypes = {
    selectedCounter: PropTypes.object,
    selectedCounterId: PropTypes.string.isRequired,
    counters: PropTypes.array.isRequired,
    deleteCounter: PropTypes.func.isRequired,
    deletePending: PropTypes.bool.isRequired,
    deleteError: PropTypes.object,
    clearDeleteError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorCreate: null,
    selectedCounter: {},
    deleteError: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreateCounterModalOpen: false,
      isDeleteAlertOpen: false,
    }
  }

  handleAddCounterClick = (e) => {
    e.preventDefault()
    this.setState({ isCreateCounterModalOpen: true })
  }

  closeCreateCounterModal = () => {
    this.setState({ isCreateCounterModalOpen: false })
  }

  setTooltipLeft = () => {
    const tooltipContainer = document.getElementsByClassName('popup-content')[0]
    if (tooltipContainer) { tooltipContainer.style.left = 'unset' }
  }

  handleShareCounter = () => {
    const { counters, selectedCounterId } = this.props
    const counterToShare = counters.find((counter) => counter.id === selectedCounterId)
    const el = document.createElement('textarea')
    el.value = `${counterToShare.count} x ${counterToShare.title}`
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  handleDeleteCounter = () => {
    this.setState({ isDeleteAlertOpen: true })
  }

  deleteAlertCloseHandler = () => {
    this.setState({ isDeleteAlertOpen: false })
  }

  deleteCounter = () => {
    const { deleteCounter, selectedCounterId } = this.props
    deleteCounter(selectedCounterId)
  }

  componentDidUpdate(prevProps) {
    const { deletePending } = this.props
  }

  dismissDeleteModal = () => {
    const { clearDeleteError } = this.props
    this.deleteAlertCloseHandler()
    clearDeleteError()
  }

  render() {
    const { isCreateCounterModalOpen, isDeleteAlertOpen } = this.state
    const {
      selectedCounterId, selectedCounter, deleteError, deletePending,
    } = this.props
    return (
      <ButtonWrapper>
        <Separator />
        {selectedCounterId !== '' && (
          <Fragment>
            <SelectionButtons>
              <Button onClick={this.handleDeleteCounter} theme="secondary"><TrashIcon style={{ marginBottom: '-7px' }} /></Button>
              <Popup
                trigger={<Button theme="secondary"><ExportIcon style={{ marginBottom: '-7px' }}/></Button>}
                repositionOnResize
                position="top center"
                on="click"
                contentStyle={popupContentStyle}
                arrowStyle={popupArrowStyle}
              >
                <Fragment>
                  <h1>Share 1 counter</h1>
                  <Button onClick={this.handleShareCounter} theme="secondary">Copy</Button>
                </Fragment>
              </Popup>
            </SelectionButtons>
            <Alert
              isOpen={isDeleteAlertOpen}
              closeHandler={this.deleteAlertCloseHandler}
              title={deleteError
                ? `Couldn't delete "${selectedCounter.title}"`
                : `Delete the "${selectedCounter.title}" counter?`}
              message={deleteError
                ? 'The Internet connection appears to be offline.'
                : 'This cannot be undone.'}
              primaryButtonText={deleteError
                ? 'Retry'
                : 'Cancel'}
              secondaryButtonText={deleteError
                ? 'Dismiss'
                : 'Delete'}
              primaryButtonHandler={deleteError ? this.deleteCounter : this.deleteAlertCloseHandler}
              secondaryButtonHandler={deleteError ? this.dismissDeleteModal : this.deleteCounter}
              secondaryButtonTextColor={deleteError ? undefined : 'red'}
              pending={deletePending}
            />
          </Fragment>
        )}
        <Button onClick={this.handleAddCounterClick}
          theme="primary"
          data-testid="Toolbar_addCounterButton">
          <PlusIcon style={{
            marginBottom: '-4px',
          }}/>
        </Button>
        <CreateCounterModal
          isModalOpen={isCreateCounterModalOpen}
          closeModal={this.closeCreateCounterModal}
        />
      </ButtonWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCounterId: getSelectedCounter(state),
  selectedCounter: getCounters(state).find((counter) => counter.id === getSelectedCounter(state)),
  counters: getCounters(state),
  deletePending: getCountersDeletePending(state),
  deleteError: getCountersDeleteError(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteCounter: deleteCounterAction,
  clearDeleteError: deleteCountersErrorClearAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
