import React from 'react'
import { connect } from 'unistore/react'
import { withTheme } from 'styled-components'
import { navigate, Link } from 'gatsby'
import Layout from '../components/layout'
import { Box, Grid, Flex, Text, Icon } from '../components'
import ChatForm from '../components/chat/ChatForm'
import ChatMessages from '../components/chat/ChatMessages'
import Avatar from '../components/user/Avatar'

class IndexPage extends React.Component {
  componentDidMount() {
    if (this.props.user === null) {
      return navigate('/login')
    }

    this.chatWrapper &&
      this.chatWrapper.scroll({
        top: this.chatWrapper.scrollHeight,
        behavior: 'instant',
      })

    this.interval = setInterval(() => {
      this.setState({ now: Date.now() })
    }, 30000)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  componentDidUpdate() {
    if (this.props.user === null) {
      return navigate('/login')
    }

    if (this.chatWrapper) {
      this.chatWrapper.scroll({
        top: this.chatWrapper.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  render() {
    if (!this.props.user) {
      return null
    }

    const { user, theme } = this.props

    return (
      <Layout>
        <Flex>
          <Box width={230} bg="grey.800">
            <Link to="/me">
              <Flex bg="rgba(0,0,0,0.1)" py={3} px={2} alignItems="center">
                <Avatar
                  url={user.photoURL}
                  size={40}
                  mr={2}
                  bg="transparent"
                  fallbackStyles={{
                    bg: 'rgba(0,0,0,0.5)',
                  }}
                />
                <Box>
                  <Text color="white" fontSize={2} fontWeight="bold">
                    {user.displayName}
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Box>

          <Flex flexDirection="column" flex="1 1 auto">
            <Box
              flex="1 1 auto"
              bg="white"
              borderBottom="1px solid"
              borderColor="grey.400"
              css="overflow-y: scroll"
              ref={node => (this.chatWrapper = node)}
            >
              <ChatMessages />
            </Box>

            <Box>
              <ChatForm />
            </Box>
          </Flex>
        </Flex>
      </Layout>
    )
  }
}

export default connect(['messages', 'user'])(withTheme(IndexPage))
