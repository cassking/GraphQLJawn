import { __prod__ } from './constants';
//save db start command
//pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

import { MikroORM } from "@mikro-orm/core";
import { Post } from './entities/Post';

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: 'liredditdb',
    // user: '',
    // password: 'xlt1jkl',
    debug: !__prod__,
    type: 'postgresql',

  });

  const post = orm.em.create(Post, {title: 'the first post'})

}

main();

console.log("HELLO i chang ed ssxxxx")
