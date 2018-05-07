import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import type { Match } from 'react-router-dom';

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

const getSubscription = () => gql`
  subscription {
    slot(where: { mutation_in: [CREATED, UPDATED, DELETED] }) {
      node {
        id
        start
        end
        user {
          name
        }
      }
    }
  }
`;

type SlotListProps = {
  data: Array<Object>,
  subscribeToMoreSlots: () => void,
};
class SlotList extends React.Component<SlotListProps> {
  componentDidMount() {
    if (this.props.subscribeToMoreSlots) {
      this.props.subscribeToMoreSlots();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <ul>
        {data.slots.map(({ id, start, end, user }) => (
          <li key={id}>
            {user.name}: {start} - {end}
          </li>
        ))}
      </ul>
    );
  }
}

const Slots = ({ eventId }: { eventId: string }) => (
  <Query query={getQuery(eventId)}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <div>Loading...</div>;

      if (error) return <div>Error :(</div>;

      return (
        <SlotList
          data={data}
          subscribeToMoreSlots={() => {
            subscribeToMore({
              document: getSubscription(eventId),
            });
          }}
        />
      );
    }}
  </Query>
);

export default function SlotsPage({ match }: { match: Match }) {
  return (
    <React.Fragment>
      <h1>Slots</h1>
      <Slots eventId={match.params.id} />
    </React.Fragment>
  );
}
