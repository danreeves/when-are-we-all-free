import React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
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

const CreateSlotQuery = gql`
  mutation createSlot(
    $eventId: ID!
    $userId: ID!
    $start: DateTime!
    $end: DateTime!
  ) {
    createSlot(
      data: {
        event: { connect: { id: $eventId } }
        user: { connect: { id: $userId } }
        start: $start
        end: $end
      }
    ) {
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
      mutation
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
              updateQuery: (prev, { subscriptionData }) => {
                console.log(prev, subscriptionData);
                return prev;
              },
            });
          }}
        />
      );
    }}
  </Query>
);

const CreateSlotButton = ({ eventId, userId }) => {
  return (
    <Mutation mutation={CreateSlotQuery}>
      {createSlot => {
        return (
          <button
            onClick={() => {
              createSlot({
                variables: {
                  eventId,
                  userId,
                  start: '2018-05-07T15:13:05.475Z',
                  end: '2018-05-07T15:13:05.475Z',
                },
              });
            }}
          >
            Add Slot
          </button>
        );
      }}
    </Mutation>
  );
};

export default function SlotsPage({ match }: { match: Match }) {
  return (
    <React.Fragment>
      <h1>Slots</h1>
      <Slots eventId={match.params.id} />
      <CreateSlotButton
        eventId={match.params.id}
        userId="cjgtgk8gw9zq60b51010nr4at"
      />
    </React.Fragment>
  );
}
