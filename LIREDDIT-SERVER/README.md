
## Includes the follow technologies:

- React
- TypeScript
- GraphQL
- URQL/Apollo
- Argon2 (node-argon2)
- Node.js
- PostgreSQL
- MikroORM/TypeORM
- Redis
- Next.js
- TypeGraphQL
- Chakra

## To start
 ```yarn dev2``

## Cleaning up Migrations

IF /dist/ directory gets too full of old migrations and files
1. stop server
2. delete contents of Migrations
3. run `yarn watch again`
4. the `yarn dev2`

## To run Migrrations either manually or automatically
to run migrations
sequence is in terminal:
+ add new entities to the config file example [Post] or [User]
+ run the migrations cli in the terminal
`npx mikro-orm migration:create  --run`

 If added to the `index.ts` file
`await orm.getMigrator().up`; runs automaticall up on starting up app
## MikroORM migration clis
- npx mikro-orm migration:create   # Create new migration with current schema diff
- npx mikro-orm migration:up       # Migrate up to the latest version
- npx mikro-orm migration:down     # Migrate one step down
- npx mikro-orm migration:list     # List all executed migrations
- npx mikro-orm migration:pending  # List all pending migrations -->
- it does not rerun old migrations, in fact, if you look at the sql statemenst, you see that mikroorm creates a migrations table and keeps track of what migrations it has/has not run

<!-- //save db start command
//pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start




// $ node node_modules/.bin/mikro-orm
// $ npx mikro-orm
// # or when installed globally
// $ mikro-orm

// SAMPLE MIGRATIONS
mutation($title: String!) {
  createPost(title: $title) {
    id
    createdAt
    updatedAt
    title
  }
}

mutation {
  register(userOptions:
  {username: "wanda", password:"pass12345"}
  ) {
      id
      createdAt
      updatedAt
      username
}
}

mutation{
  deletePost(id: 5)
}

mutation($title: String!) {
  updatePost(id: 1 title: $title) {
    id
    createdAt
    updatedAt
    title
  }
}

{
  posts {
    id
    title
    createdAt
    updatedAt
  }
}

mutation {
  register(userOptions:
  {username: "cassinew", password: "cassix"}) {
    id
    createdAt
    updatedAt
    username
  }
}
mutation {
  login(userOptions: {username: "cassine", password: "cassix"}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}


