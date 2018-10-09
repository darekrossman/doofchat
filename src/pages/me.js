import React from 'react'
import { connect } from 'unistore/react'
import { withTheme } from 'styled-components'
import actions from '../actions'
import Layout from '../components/layout'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Input,
  IconButton,
} from '../components'
import Avatar from '../components/user/Avatar'

class Profile extends React.Component {
  state = this.props.user
    ? {
        user: {
          displayName: this.props.user.displayName || '',
          email: this.props.user.email,
        },
      }
    : {}

  static getDerivedStateFromProps(props, state) {
    return props.user && !state.user
      ? {
          user: {
            displayName: props.user.displayName || '',
            email: props.user.email,
          },
        }
      : state
  }

  updateProfile = ev => {
    this.setState({ user: { [ev.target.name]: ev.target.value } })
  }

  submit = async ev => {
    ev.preventDefault()
    this.props.updateUserProfile({
      uid: this.props.user.uid,
      ...this.state.user,
    })
  }

  render() {
    const { user, updateProfileImage, theme } = this.props

    if (!user) {
      return null
    }

    return (
      <Layout>
        <Flex flexDirection="column" flex="1 1 auto" bg="grey.900">
          <Flex
            flexDirection="column"
            alignItems="center"
            m="auto"
            background={`linear-gradient(${theme.colors.orange[500]}, ${
              theme.colors.pink[500]
            })`}
            borderRadius={8}
            width="100%"
            px={4}
            pb={4}
            maxWidth={320}
            position="relative"
          >
            <Avatar
              editable
              url={user.photoURL}
              updateProfileImage={updateProfileImage}
              mt={-50}
              mb={3}
              border="4px solid"
              borderColor="grey.900"
            />

            <Box>
              <Text
                textAlign="center"
                color="white"
                fontSize={4}
                fontWeight="semibold"
              >
                {user.displayName}
              </Text>
              <Text
                textAlign="center"
                color="black"
                fontSize={1}
                opacity={0.5}
                css="mix-blend-mode: multiply;"
              >
                {user.email}
              </Text>
            </Box>

            <IconButton
              icon="Edit"
              position="absolute"
              top={0}
              right={0}
              color="black"
              opacity={0.8}
              bg="transparent"
              size={19}
              css="mix-blend-mode: overlay;"
            />
          </Flex>
        </Flex>
      </Layout>
    )
  }
}

export default connect(
  'user',
  actions
)(withTheme(Profile))
