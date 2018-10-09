import React from 'react'
import { connect } from 'unistore/react'
import actions from '../../actions'
import { Flex, Button, Input } from '../'

class ChatForm extends React.Component {
  state = {
    messageInput: '',
  }

  sendMessage = ev => {
    ev.preventDefault()
    this.setState({ messageInput: '' })
    this.props.createMessage({ message: this.state.messageInput })
  }

  updateMessageInput = ev => {
    this.setState({ messageInput: ev.target.value })
  }

  render() {
    return (
      <form autoComplete="off" onSubmit={this.sendMessage}>
        <Flex>
          <Input
            flex="1 1 auto"
            border="0"
            borderRadius="0px"
            name="message"
            type="text"
            height={60}
            px={4}
            placeholder="do me a chat..."
            value={this.state.messageInput}
            onChange={this.updateMessageInput}
          />
        </Flex>
      </form>
    )
  }
}

export default connect(
  'messages',
  actions
)(ChatForm)
