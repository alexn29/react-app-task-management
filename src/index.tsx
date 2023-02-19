import React from 'react'
import ReactDOM from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, ApolloProvider } from '@apollo/client'
import { App } from '@modules/app'

import 'semantic-ui-css/semantic.min.css'
import 'remixicon/fonts/remixicon.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'sweetalert2/src/sweetalert2.scss'
import './assets/scss/index.module.scss'

// setting up apollo client
const httpLink = new HttpLink({ uri: 'https://syn-api-prod.herokuapp.com/graphql' })

const authLink = new ApolloLink((operation, forward) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiMDk3YTI3Zjk5YWE4IiwicHJvamVjdElkIjoiMmY5NzRkZGItOWNkMS00MGIyLThlYzAtNTBjZWE4MWI5M2UxIiwiZnVsbE5hbWUiOiJBbGV4IE5hdmFycm8iLCJlbWFpbCI6ImxleG4yOUBnbWFpbC5jb20iLCJpYXQiOjE2NzYxMjUxMTF9.VTegayr3AiqDplZtjbQ841l_es2BlFzZQTHdstBxklI'

  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <App />
      </SkeletonTheme>
    </ApolloProvider>
  </React.Fragment>
)
