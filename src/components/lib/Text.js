import styled from 'styled-components'
import { textStyles } from 'styled-system'
import Base from './Base'

const Text = styled(Base)({}, textStyles)

Text.defaultProps = {
  as: 'p',
  m: 0,
  fontFamily: 'serif',
  lineHeight: 1.5,
}

export default Text
