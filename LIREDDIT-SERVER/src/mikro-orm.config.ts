import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path'; // path built into node
import { User } from "./entities/User";

export default {
    migrations: {
      path: path.join(__dirname,'./migrations'), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
  entities: [Post, User],
  dbName: 'redditapp',
  // user: 'cassi',
  debug: !__prod__,
  type: 'postgresql',
  //owner cassandrakingoldmac

} as Parameters<typeof MikroORM.init>[0];

