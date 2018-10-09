import React from 'react'
import createStore from 'unistore'
import { Provider } from 'unistore/react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './src/components/GlobalStyle'
import theme from './src/theme'

const initialState = { messages: {} }
const store = createStore(initialState)

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        {element}
      </React.Fragment>
    </ThemeProvider>
  </Provider>
)
