import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import * as resolvers from './resolvers';

const db = new Prisma({
  typeDefs: 'server/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

const server = new GraphQLServer({
  typeDefs: './server/generated/prisma.graphql',
  resolvers,
  context: req => ({ ...req, db }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

server.start(cnf => {
  console.log(`Server is running on http://localhost:${cnf.port}`);
});
