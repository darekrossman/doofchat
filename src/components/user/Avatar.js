import React from 'react'
import { Box, Text, Flex, Input, Icon } from '../'

class Avatar extends React.Component {
  static defaultProps = {
    updateProfileImage: Function.prototype,
  }

  handleImage = async ev => {
    const file = ev.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      this.props.updateProfileImage({ dataURL: e.target.result, file })
    }
    reader.readAsDataURL(file)
  }

  render() {
    const {
      url,
      fallback,
      fallbackStyles,
      size = 150,
      editable = false,
      updateProfileImage,
      ...rest
    } = this.props
    return (
      <Box
        width={size}
        height={size}
        borderRadius="50%"
        bg="grey.900"
        position="relative"
        overflow="hidden"
        {...rest}
      >
        {url ? (
          <Box
            as="img"
            src={url}
            maxHeight="100%"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          />
        ) : fallback ? (
          fallback
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            borderRadius="50%"
            bg="grey.800"
            pt="8px"
            {...fallbackStyles}
          >
            <Icon name="UserAstronaut" size={size * 0.9} color="white" />
          </Flex>
        )}

        {editable && (
          <Box
            as="input"
            type="file"
            name="photoURL"
            accept="image/*"
            onChange={this.handleImage}
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            opacity={0}
          />
        )}
      </Box>
    )
  }
}

export default Avatar
