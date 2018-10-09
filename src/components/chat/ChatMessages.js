import React from 'react'
import { connect } from 'unistore/react'
import actions from '../../actions'
import ChatMessage from './ChatMessage'
import { Box } from '../'

class ChatMessages extends React.Component {
  render() {
    const { messages } = this.props
    return (
      <>
        {Object.keys(messages).map(messageId => (
          <Box key={messageId} my={4} mx={3}>
            <ChatMessage message={messages[messageId]} />
          </Box>
        ))}
      </>
    )
  }
}

export default connect(
  'messages',
  actions
)(ChatMessages)
