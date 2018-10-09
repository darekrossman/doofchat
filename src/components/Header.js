import React from 'react'
import { connect } from 'unistore/react'
import { withTheme } from 'styled-components'
import { Link } from 'gatsby'
import { Box, Grid, Flex, Text, Icon } from '../components'
import Avatar from '../components/user/Avatar'

class Header extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Flex bg="primary.main" height={60} flex="1 0 auto" alignItems="center">
        <Box ml="auto">
          <Link to="/me">
            <Avatar
              url={user.photoURL}
              size={30}
              mr={2}
              bg="transparent"
              fallbackStyles={{
                bg: 'rgba(0,0,0,0.5)',
              }}
            />
          </Link>
        </Box>
      </Flex>
    )
  }
}

export default connect('user')(withTheme(Header))
