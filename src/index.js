import React from 'react';
import ReactDOM from 'react-dom';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UsersPage from './pages/users';
import EventsPage from './pages/events';
import EventPage from './pages/event';

const PRODUCTION = process.env.NODE_ENV !== 'development';

const GRAPHQL_ENDPOINT = PRODUCTION
  ? 'eu1.prisma.sh/when-are-we-all-free/when-are-we-all-free/dev'
  : 'localhost:4000';

const httpLink = new HttpLink({
  uri: `http${PRODUCTION ? 's' : ''}://${GRAPHQL_ENDPOINT}`,
});
const wsLink = new WebSocketLink({
  uri: `ws${PRODUCTION ? 's' : ''}://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
          </ul>

          <Route path="/users" component={UsersPage} />
          <Route exact path="/events" component={EventsPage} />
          <Route path="/events/:id" component={EventPage} />
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
