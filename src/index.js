import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UsersPage from './pages/users';
import EventsPage from './pages/events';
import EventPage from './pages/event';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/when-are-we-all-free/when-are-we-all-free/dev',
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
