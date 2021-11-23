import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://864lj.sse.codesandbox.io/",
  cache: new InMemoryCache(),
});
