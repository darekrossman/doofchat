import React from 'react'
import { connect } from 'unistore/react'
import { withTheme } from 'styled-components'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import { Box, Grid, Flex, Text, Icon } from '../components'
import ChatForm from '../components/chat/ChatForm'
import ChatMessages from '../components/chat/ChatMessages'
import Header from '../components/Header'

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

  componentDidUpdate(prevProps) {
    if (this.props.user === null) {
      return navigate('/login')
    }

    if (this.chatWrapper) {
      this.chatWrapper.scroll({
        top: this.chatWrapper.scrollHeight,
        behavior:
          Object.keys(prevProps.messages).length === 0 &&
          Object.keys(this.props.messages).length > 0
            ? 'instant'
            : 'smooth',
      })
    }
  }

  render() {
    if (!this.props.user) {
      return null
    }

    const {
      user,
      theme: { colors },
    } = this.props

    return (
      <Layout
        background={`linear-gradient(${colors.grey[200]}, ${colors.grey[50]})`}
      >
        <Flex flexDirection="column" flex="1 1 auto">
          <Header />

          <Box
            flex="1 1 auto"
            css="overflow-y: scroll"
            ref={node => (this.chatWrapper = node)}
          >
            <ChatMessages />
          </Box>

          <Box>
            <ChatForm />
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default connect(['messages', 'user'])(withTheme(IndexPage))
