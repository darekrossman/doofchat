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

const firebaseAppConfig = {
  apiKey: 'AIzaSyDKF4H_YkaiVY8MO8PZ7lCQe2BVmKgxyVg',
  authDomain: 'doofchat-cd12f.firebaseapp.com',
  databaseURL: 'https://doofchat-cd12f.firebaseio.com',
  projectId: 'doofchat-cd12f',
  storageBucket: 'doofchat-cd12f.appspot.com',
  messagingSenderId: '343565348850',
}
const db = initDB(firebaseAppConfig)
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
