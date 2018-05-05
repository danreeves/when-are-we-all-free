import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/when-are-we-all-free/when-are-we-all-free/dev',
});

const QUERY = gql`
  query {
    users {
      name
      email
    }
  }
`;

const UserList = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <ul>
          {data.users.map(({ name, email }, index) => (
            <li key={index}>
              {name}: {email}
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <h1> Hey Dan! </h1>
        <UserList />
      </React.Fragment>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
