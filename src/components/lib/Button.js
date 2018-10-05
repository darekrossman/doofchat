import chroma from 'chroma-js'
import { themeGet, buttonStyle, mixed } from 'styled-system'
import styled, { css as scss } from 'styled-components'
import Base, { extendBase } from './Base'

const Button = styled(Base)(
  {
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: 'inherit',
    textDecoration: 'none',
    outline: 'none',
    '&[disabled]': {
      opacity: 0.5,
    },
    '&:active': {
      opacity: 0.8,
    },
  },
  buttonStyle,
  p => p.theme['Button']
)

Button.defaultProps = {
  as: 'button',
  border: 0,
  py: 0,
  px: 3,
  borderRadius: 3,
  minWidth: 40,
  height: 40,
  bg: 'primary.main',
  color: 'primary.contrast',
  fontWeight: 600,
  fontFamily: 'sans',
  fontSize: 1,
}

export default Button
