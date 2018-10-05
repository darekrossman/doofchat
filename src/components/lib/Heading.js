import styled from 'styled-components'
import { textStyles } from 'styled-system'
import Base from './Base'

const Heading = styled(Base)({}, textStyles)

Heading.defaultProps = {
  as: 'h2',
  fontFamily: 'sans',
  m: 0,
}

export default Heading
