import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const getQuery = id => gql`
  query {
    slots (where: {
      event: {
        id: "${id}"
      }
    }) {
      id
      start
      end
      user {
        name
      }
    }
  }
`;

const SlotList = ({ eventId }) => (
  <Query query={getQuery(eventId)}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <ul>
          {data.slots.map(({ id, start, end, user }) => (
            <li key={id}>
              {user.name}: {start} - {end}
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default function SlotsPage({ match }) {
  return (
    <React.Fragment>
      <h1>Slots</h1>
      <SlotList eventId={match.params.id} />
    </React.Fragment>
  );
}
