import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-modal'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCountersCreationPending, getCountersCreationError } from '../../redux/reducers'
import createCounterAction from '../../redux/createCounter'

import Button from '../Button'
import CloseButton from '../../icons/CloseButton.svg'
import Centered from '../CenteredWrapper'
import ActivityIndicator from '../../icons/activityIndicator.svg'

Modal.setAppElement('#root')

const modalStyles = {
  content: {
    top: '15px',
    left: '0',
    right: 'auto',
    bottom: 'auto',
    width: '100vw',
    padding: '0',
    height: 'calc(100vh - 15px)',
    borderRadius: '16px 16px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

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

class CreateCounterModal extends Component {
    static propTypes = {
      pendingCreate: PropTypes.bool.isRequired,
      errorCreate: PropTypes.object,
      createCounter: PropTypes.func.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      closeModal: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = {
        counterName: '',
      }
    }

  handleCounterNameChange = (e) => {
    this.setState({
      counterName: e.target.value,
    })
  }

  saveCounterButtonHanlder = () => {
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
      this.setState({ counterName: 'Hubo un error' })
    }
  }

  render() {
    const { isModalOpen, pendingCreate, closeModal } = this.props
    const { counterName } = this.state
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <ModalControls>
          <CloseButton
            onClick={closeModal}
            style={{
              paddingRight: '16px',
            }}/>
          <h1 style={{ flex: '1' }}>Create counter</h1>
          <Button theme='primary' onClick={this.saveCounterButtonHanlder}>
              Save
          </Button>
        </ModalControls>
        <ModalContent>
          <form>
            <label>
                Name
              <input value={counterName} onChange={this.handleCounterNameChange} placeholder="Cups of coffee" type="text"></input>
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
    )
  }
}

const mapStateToProps = (state) => ({
  errorCreate: getCountersCreationError(state),
  pendingCreate: getCountersCreationPending(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createCounter: createCounterAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateCounterModal)
