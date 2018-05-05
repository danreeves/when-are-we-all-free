import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UsersPage from './pages/users';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/when-are-we-all-free/when-are-we-all-free/dev',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <Link to="users">Users</Link>
          <Route name="users" path="/users" component={UsersPage} />
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
