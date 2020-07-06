import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-modal'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCountersCreationPending, getCountersCreationError } from '../../redux/reducers'
import createCounterAction from '../../redux/createCounter'
import { createCountersErrorClearAction } from '../../redux/clearError'

import Button from '../Button'
import Alert from '../AlertModal'
import CloseIcon from '../../icons/CloseButton.svg'
import Centered from '../CenteredWrapper'
import ActivityIndicator from '../../icons/activityIndicator.svg'

Modal.setAppElement('#root')

const ModalControls = styled.div`
    display: flex;
    height: 70px;
    border-bottom: 3px solid #c4c4c438;
    align-items: center;
    padding: 0 16px;
  `

const ModalContent = styled.div`
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
  `

const InputHint = styled.span`
    color: #888B90;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
  `

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  margin-right: 16px;
`

class CreateCounterModal extends Component {
    static propTypes = {
      pendingCreate: PropTypes.bool.isRequired,
      errorCreate: PropTypes.object,
      createCounter: PropTypes.func.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      closeModal: PropTypes.func.isRequired,
      clearCreateError: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = {
        counterName: '',
        isCreationErrorModalOpen: false,
      }
    }

  handleCounterNameChange = (e) => {
    this.setState({
      counterName: e.target.value,
    })
  }

  saveCounterButtonHanlder = (evt) => {
    evt.preventDefault()
    const { createCounter } = this.props
    const { counterName } = this.state
    createCounter({ title: counterName })
  }

  componentDidUpdate(prevProps) {
    const { pendingCreate, closeModal, errorCreate } = this.props
    if (prevProps.pendingCreate === true && pendingCreate === false && !errorCreate) {
      closeModal()
      this.setState({ counterName: '' })
    }
    if (prevProps.pendingCreate === true && pendingCreate === false && errorCreate) {
      closeModal()
      this.setState({ isCreationErrorModalOpen: true, counterName: '' })
    }
  }

  errorModalCloseHandler = () => {
    const { clearCreateError } = this.props
    clearCreateError()
    this.setState({ isCreationErrorModalOpen: false })
  }

  render() {
    const { isModalOpen, pendingCreate, closeModal } = this.props
    const { counterName, isCreationErrorModalOpen } = this.state
    return (
      <Fragment>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="createModalOpen"
          overlayClassName="modalOverlay"
        >
          <ModalControls>
            <CloseButton
              onClick={closeModal}
            />
            <h1 style={{ flex: '1' }}>Create counter</h1>
            <Button id='saveNewCounterButton'
              theme='primary'
              onClick={this.saveCounterButtonHanlder}
              disabled={pendingCreate}
            >
              Save
            </Button>
          </ModalControls>
          <ModalContent>
            <form
              onSubmit={this.saveCounterButtonHanlder}
            >
              <label>
                Name
                <input
                  autoFocus
                  id="counterNameInput"
                  value={counterName}
                  onChange={this.handleCounterNameChange}
                  placeholder="Cups of coffee"
                  type="text"
                  disabled={pendingCreate}
                />
                <InputHint>Give it a name. Creative block? See examples.</InputHint>
              </label>
            </form>
            {pendingCreate && (
              <Centered>
                <ActivityIndicator />
              </Centered>
            )}
          </ModalContent>
        </Modal>
        <Alert
          isOpen={isCreationErrorModalOpen}
          closeHandler={this.errorModalCloseHandler}
          title="Couldn't create counter"
          message="The Internet connection appears to be offline."
          primaryButtonText="Dismiss"
          primaryButtonHandler={this.errorModalCloseHandler}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  errorCreate: getCountersCreationError(state),
  pendingCreate: getCountersCreationPending(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createCounter: createCounterAction,
  clearCreateError: createCountersErrorClearAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateCounterModal)
