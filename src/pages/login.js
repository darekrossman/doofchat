import React from 'react'
import { connect } from 'unistore/react'
import { withTheme } from 'styled-components'
import actions from '../actions'
import Layout from '../components/layout'
import { Box, Flex, Input, Text, Button } from '../components'

class Login extends React.Component {
  state = {
    isNewAccount: false,
    error: null,
    form: {
      email: '',
      displayName: '',
      password: '',
    },
  }

  updateForm = ev => {
    this.setState({
      form: { ...this.state.form, [ev.target.name]: ev.target.value },
    })
  }

  submit = async ev => {
    ev.preventDefault()
    try {
      const result = this.state.isNewAccount
        ? await this.props.createUser(this.state.form)
        : await this.props.authenticate(this.state.form)
      console.log(result)
    } catch (error) {
      console.log(error.code)
      if (error.code === 'auth/user-not-found') {
        return this.setState({ isNewAccount: true })
      }
      const errors = {
        'auth/wrong-password': ':( that was the wrong password',
      }
      this.setState({
        error: errors[error.code] || 'an unknown error occured.',
      })
    }
  }

  render() {
    const { theme } = this.props
    const {
      isNewAccount,
      error,
      form: { email, password, displayName },
    } = this.state

    return (
      <Layout
        background={`linear-gradient(${theme.colors.purple[500]}, ${
          theme.colors.purple[900]
        })`}
      >
        <Box m="auto" width="100%" maxWidth={280} borderRadius={4}>
          <form onSubmit={this.submit}>
            <Flex flexDirection="column" alignItems="stretch">
              {error && (
                <Box
                  bg="red.500"
                  p={2}
                  textAlign="center"
                  borderRadius={4}
                  mb={3}
                >
                  <Text fontSize={1} fontWeight="semibold" color="white">
                    {error}
                  </Text>
                </Box>
              )}

              {isNewAccount && (
                <Input
                  name="displayName"
                  value={displayName}
                  placeholder="Nickname"
                  onChange={this.updateForm}
                  mb={3}
                  borderColor="white"
                  opacity={0.95}
                />
              )}
              <Input
                required
                name="email"
                value={email}
                placeholder="Email address"
                onChange={this.updateForm}
                mb={3}
                borderColor="white"
                opacity={0.95}
              />
              <Input
                required
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={this.updateForm}
                mb={3}
                borderColor="white"
                opacity={0.95}
              />
            </Flex>

            <Flex justifyContent="space-between" mt={2}>
              <Button
                type="submit"
                width="100%"
                bg="transparent"
                border="1px solid rgba(255,255,255,0.2)"
              >
                {isNewAccount ? 'Sign Up' : 'Login'}
              </Button>
            </Flex>
          </form>
        </Box>
      </Layout>
    )
  }
}

export default connect(
  'user',
  actions
)(withTheme(Login))
