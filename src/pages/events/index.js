import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const QUERY = gql`
  query {
    events {
      id
      name
      description
    }
  }
`;

const EventList = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <ul>
          {data.events.map(({ id, name, description }) => (
            <li key={id}>
              <Link to={`/events/${id}`}>
                {name}: {description}
              </Link>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default function EventsPage() {
  return (
    <React.Fragment>
      <h1>Events</h1>
      <EventList />
    </React.Fragment>
  );
}
