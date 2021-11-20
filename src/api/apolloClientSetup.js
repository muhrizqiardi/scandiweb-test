import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://864lj.sse.codesandbox.io/",
  cache: new InMemoryCache(),
});
