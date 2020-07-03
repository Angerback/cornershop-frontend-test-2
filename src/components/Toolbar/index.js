/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

import CreateCounterModal from '../CreateCounterModal'
import Button from '../Button'
import PlusIcon from '../../icons/Plus.svg'

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

class Toolbar extends PureComponent {
  static defaultProps = {
    errorCreate: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      createCounterModalOpen: false,
    }
  }

  handleAddCounterClick = (e) => {
    e.preventDefault()
    this.setState({ createCounterModalOpen: true })
  }

  closeCreateCounterModal = () => {
    this.setState({ createCounterModalOpen: false })
  }

  render() {
    const { createCounterModalOpen } = this.state
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
        <CreateCounterModal
          isModalOpen={createCounterModalOpen}
          closeModal={this.closeCreateCounterModal}
        />
      </ButtonWrapper>
    )
  }
}

export default Toolbar
