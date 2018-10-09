import React from 'react'
import { connect } from 'unistore/react'
import actions from '../../actions'
import ChatMessage from './ChatMessage'
import { Flex } from '../'

class ChatMessages extends React.Component {
  render() {
    const { messages } = this.props

    let currentUID

    return (
      <>
        {Object.keys(messages).map(messageId => {
          const uid = messages[messageId].user
          const isGroup = currentUID && uid === currentUID
          currentUID = uid
          return (
            <Flex key={messageId} mt={isGroup ? '-28px' : 4} mb={4} mx={3}>
              <ChatMessage message={messages[messageId]} hideAvatar={isGroup} />
            </Flex>
          )
        })}
      </>
    )
  }
}

export default connect(
  'messages',
  actions
)(ChatMessages)
