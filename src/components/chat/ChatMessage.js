import React from 'react'
import { connect } from 'unistore/react'
import { formatMessageDisplayDate } from '../../util/formatDate'
import actions from '../../actions'
import { Box, Flex, Text, Heading } from '../'
import Avatar from '../user/Avatar'

class ChatMessage extends React.Component {
  render() {
    const { message, members } = this.props

    if (!message.message) {
      return null
    }

    const author = members[message.user]

    return (
      <Flex alignItems="center">
        <Avatar url={author.photoURL} size={40} mr={3} bg="white" />
        <Box>
          <Flex alignItems="baseline">
            <Text fontSize={1} fontWeight="bold" mr={2}>
              {author.displayName}
            </Text>
            <Text fontSize={0} color="grey.500">
              {formatMessageDisplayDate(message.timestamp)}
            </Text>
          </Flex>
          <Text>{message.message}</Text>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  'members',
  actions
)(ChatMessage)
