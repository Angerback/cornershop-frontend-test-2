/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styled from 'styled-components'
import Button from '../Button'
import PlusIcon from '../../icons/Plus.svg'

import { getCountersCreationPending, getCountersCreationError } from '../../redux/reducers'
import createCounterAction from '../../redux/createCounter'

import CloseButton from '../../icons/CloseButton.svg'

Modal.setAppElement('#root')

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
`

const InputHint = styled.span`
  color: #888B90;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
`

class Toolbar extends PureComponent {
  static propTypes = {
    pendingCreate: PropTypes.bool.isRequired,
    errorCreate: PropTypes.object,
    createCounter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorCreate: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      createCounterModalOpen: false,
      counterName: '',
    }
  }

  handleAddCounterClick = (e) => {
    e.preventDefault()
    this.setState({ createCounterModalOpen: true })
  }

  handleCounterNameChange = (e) => {
    this.setState({
      counterName: e.target.value,
    })
  }

  closeCreateCounterModal = () => {
    this.setState({ createCounterModalOpen: false })
  }

  saveCounterButtonHanlder = () => {
    const { createCounter } = this.props
    const { counterName } = this.state
    createCounter({ title: counterName })
  }

  render() {
    const { pendingCreate, errorCreate } = this.props
    const { createCounterModalOpen, counterName } = this.state
    return (
      <ButtonWrapper>
        <Separator />
        <Button onClick={this.handleAddCounterClick}
          theme="primary"
          data-testid="Toolbar_addCounterButton">
          <PlusIcon style={{
            marginBottom: '-4px',
          }}/>
        </Button>
        <Modal
          isOpen={createCounterModalOpen}
          onRequestClose={this.closeCreateCounterModal}
          style={modalStyles}
        >
          <ModalControls>
            <CloseButton
              onClick={this.closeCreateCounterModal}
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
          </ModalContent>
        </Modal>
      </ButtonWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
