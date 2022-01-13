
Includes the follow technologies:

- React
- TypeScript
- GraphQL
- URQL/Apollo
- Node.js
- PostgreSQL
- MikroORM/TypeORM
- Redis
- Next.js
- TypeGraphQL
- Chakra


<!-- npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:pending  # List all pending migrations -->


<!-- IF dist/ folder gets too full of old migrations and files
delete it all
stop server
run yarn watch again
the yarn dev2 -->

<!-- //save db start command
//pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start


// to start app use `yarn dev2`
// to start app use `$ yarn dev2`
// $ node node_modules/.bin/mikro-orm
// $ npx mikro-orm
// # or when installed globally
// $ mikro-orm