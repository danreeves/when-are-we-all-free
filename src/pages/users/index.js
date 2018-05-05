import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const QUERY = gql`
  query {
    users {
      id
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
          {data.users.map(({ id, name, email }) => (
            <li key={id}>
              {name}: {email}
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default function UsersPage() {
  return (
    <React.Fragment>
      <h1>Users</h1>
      <UserList />
    </React.Fragment>
  );
}
