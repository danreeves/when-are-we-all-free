# 🗓 When

## Requirements

1.  node
2.  docker/docker-compose

## Getting started

1.  `npm i` Install the project dependencies
2.  `docker-compose up -d` Run the postgres database and the prisma service
3.  `npm run update-schema` Deploy the datamodel to prisma and download the schema
4.  `./bin/dev` Run the client app and the graphql server in tmux windows

## Development

### Data model

Change the datamodel in `datamodel.graphql`. Run `npm run update-schema` to deploy it to your local prisma instance and download the updated schema. The schema is saved in `server/generated/prisma.graphql` and should be commit to the repo.

### App

The client app is in `src`. It's a react application and you can run it locally with with `npm run dev:app`.

### Server

The server is a `graphql-yoga` server with `prisma-bindings` to give access to the database layer.

### Architecture

The bottom layer is PostgresQL, but you don't need to worry about that. It's running inside docker and we interface with it through Prisma.

The next layer is Prisma. Prisma provides us a GraphQL ORM to the database, making it easy to query the data and write business logic on top of. It also handles our data schema and syncing that with the database.

The next layer up is our custom GraphQL server. From here we can pass queries directly through to Prisma or use the `prisma-binding` API to query the prisma layer directly.

The final layer is our client application, from here we send GraphQL queries to our custom server.
