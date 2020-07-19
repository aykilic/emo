import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { createUploadLink } from 'apollo-upload-client'
import apolloUploadClient from "apollo-upload-client"
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'


// const link =createUploadLink({ uri: 'http://localhost:4000/graphql',fetch: fetch });
const link = apolloUploadClient.createUploadLink({
  uri: 'http://'+ process.env.API +':4000/graphql',
      credentials:'include'
});

// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  link,
  cache: new InMemoryCache(),
   connectToDevTools: true,

});
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  loadingKey: 'loading',
  errorHandler ({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider
}
