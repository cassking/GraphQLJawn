//save db start command
//pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

import { MikroORM } from "@mikro-orm/core";
import { Post } from './entities/Post';
import { __prod__ } from './constants';
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);    
  await orm.getMigrator().up;

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  const today = Date.now()
  console.log("--------------------sql post from yarn dev2---------------------- ")

  const post = orm.em.create(Post, { title: "my first post", created_at: today, updated_at: today });
  await orm.em.persistAndFlush(post);

  main().catch((err) => {
    console.log("**-----ANY ERRORRS?????? -------*", err);
  });

  console.log("dirname",__dirname )
}

main();

console.log("HELLO i nnhangd ssxsssssxxx")
