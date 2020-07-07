import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Modal from 'react-modal'

import Button from '../Button'

Modal.setAppElement('#root')

const ButtonWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-evenly;
    margin-top: 20px;
`

export default class AlertModal extends Component {
    static propTypes = {
      isOpen: PropTypes.bool.isRequired,
      closeHandler: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      primaryButtonText: PropTypes.string.isRequired,
      secondaryButtonText: PropTypes.string,
      primaryButtonHandler: PropTypes.func.isRequired,
      secondaryButtonHandler: PropTypes.func,
      secondaryButtonTextColor: PropTypes.string,
      pending: PropTypes.bool,
    }

    static defaultProps = {
      secondaryButtonTextColor: '',
      secondaryButtonText: null,
      secondaryButtonHandler: null,
      pending: false,
    }

    render() {
      const {
        isOpen,
        closeHandler,
        title,
        message,
        primaryButtonText,
        secondaryButtonText,
        primaryButtonHandler,
        secondaryButtonHandler,
        secondaryButtonTextColor,
        pending,
      } = this.props
      return (
        <div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeHandler}
            className="alertModal"
            overlayClassName="modalOverlay"
          >
            <h1>{title}</h1>
            <span>{message}</span>
            <ButtonWrapper>
              <Button data-testid="Alert__primary-button" disabled={pending} theme="primary" onClick={primaryButtonHandler}>{primaryButtonText}</Button>
              {secondaryButtonText && secondaryButtonHandler && (
                <Button data-testid="Alert__secondary-button" disabled={pending} style={{ color: secondaryButtonTextColor }}
                  theme="secondary"
                  onClick={secondaryButtonHandler}>{secondaryButtonText}
                </Button>
              )}
            </ButtonWrapper>
          </Modal>
        </div>
      )
    }
}
