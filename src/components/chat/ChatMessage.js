import React from 'react'
import { connect } from 'unistore/react'
import { withTheme } from 'styled-components'
import chroma from 'chroma-js'
import { formatMessageDisplayDate } from '../../util/formatDate'
import actions from '../../actions'
import { Box, Flex, Text, Heading } from '../'
import Avatar from '../user/Avatar'

class ChatMessage extends React.Component {
  render() {
    const {
      message,
      members,
      user,
      hideAvatar = false,
      theme: { colors },
    } = this.props

    if (!message.message) {
      return null
    }

    const author = members[message.user]
    const isMe = message.user === user.uid

    return (
      <Flex
        flexDirection="column"
        alignItems={isMe ? 'flex-end' : 'flex-start'}
        ml={isMe ? 'auto' : 0}
        mr={isMe ? 0 : 'auto'}
      >
        {!hideAvatar && (
          <Box mb={2}>
            <Avatar url={author.photoURL} size={32} bg="transparent" />
          </Box>
        )}

        {/* <Flex alignItems="baseline">
            <Text fontSize={1} fontWeight="bold" mr={2}>
              {author.displayName}
            </Text>
            <Text fontSize={0} color="grey.500">
              {formatMessageDisplayDate(message.timestamp)}
            </Text>
          </Flex> */}
        <Box
          borderRadius={isMe ? '16px 3px 16px 16px' : '3px 16px 16px 16px'}
          ml={isMe ? 5 : 0}
          mr={!isMe ? 5 : 0}
          py="12px"
          px="18px"
          background={
            isMe
              ? `linear-gradient(45deg, ${colors.primary.main}, ${
                  colors.primary.dark
                })`
              : 'white'
          }
          boxShadow={
            !isMe
              ? `0px 4px 8px ${chroma(colors.primary.main)
                  .alpha(0.1)
                  .css()}`
              : `0px 2px 4px ${chroma(colors.primary.dark)
                  .alpha(0.2)
                  .css()}`
          }
        >
          <Text
            fontSize={1}
            lineHeight="20px"
            color={isMe ? 'white' : 'grey.800'}
          >
            {message.message}
          </Text>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  ['user', 'members'],
  actions
)(withTheme(ChatMessage))
