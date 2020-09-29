import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
// import {HttpsLink} from 'apollo-link/lib/'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { createUploadLink } from 'apollo-upload-client'
import apolloUploadClient from "apollo-upload-client"
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
// import { WebSsocketLink } from 'apollo-link-ws/lib/inde'
import { getMainDefinition } from 'apollo-utilities'
import VueApollo from 'vue-apollo'
import { Cookies } from "quasar"
import fetch from 'node-fetch'


// const link =createUploadLink({ uri: 'http://localhost:4000/graphql',fetch: fetch });
// const httpLink = apolloUploadClient.createUploadLink({
//   uri: 'http://'+ process.env.API +':4000/graphql',
//       credentials:'include'
// });
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri:  process.env.API +':443/graphql',
})
const wsLink = new WebSocketLink({
  uri:  process.env.WAPI +':443/graphql',
  options: {
    // connectionParams: {
    //   ibo: 1,
    // },
    reconnect: true,
  },
})

// const authMiddleware =   split((operation, forward) => {
//   // add the authorization to the headers
//   const token = Cookies.get('token')
//   operation.setContext({
//     headers: {
//       // authorization: token ? `Bearer ${token}` : null
//       authorization: token ? `${token}` : null
//     }
//   })

//   return forward(operation)
// })
const link = split(({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
  // authMiddleware
)
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('authorization_token');
  const token = Cookies.get('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});
// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  // link,
  link: authLink.concat(link),
  cache: new InMemoryCache(),
   connectToDevTools: true,
  //  fetchOptions:{
  //    credentials:'include'
  //  },
  //  request:operation=>{
  //    headers:{
  //      authorization:Cookies.get('token')
  //    }
  //  }

});
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  loadingKey: 'loading',
  errorHandler ({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          //  `[GraphQL error]: Message: Ql Failed!`
          
        )
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
      //  console.log(`[Network error]: "Network Failed"`)
      
    }
  }
  // errorHandler (error) {
  //   console.log('Global error handler')
  //   console.error(error)
  // },
});
export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider
}
