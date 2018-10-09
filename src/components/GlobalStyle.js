import { createGlobalStyle as css } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyle = css`
  ${normalize()} * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background: #f6f6f6;
    font-weight: 400;
  }

  body,
  input,
  textarea,
  select,
  button {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
  }

  #___gatsby {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    & > div:first-child {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: stretch;
    }
  }
`

export default GlobalStyle
