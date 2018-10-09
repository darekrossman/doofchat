import React from 'react'
import createStore from 'unistore'
import { Provider } from 'unistore/react'
import devtools from 'unistore/devtools'
import { ThemeProvider } from 'styled-components'
import {
  initDB,
  syncMessages,
  syncMembers,
  syncAuth,
} from './src/util/database'
import GlobalStyle from './src/components/GlobalStyle'
import theme from './src/theme'

const db = initDB()
const initialState = { messages: {} }
const store =
  process.env.NODE_ENV === 'production'
    ? createStore(initialState)
    : devtools(createStore(initialState))

syncMessages(db, store)
syncMembers(db, store)
syncAuth(db, store)

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          {element}
        </React.Fragment>
      </ThemeProvider>
    </Provider>
  )
}
