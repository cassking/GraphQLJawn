
import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import microConfig from "./mikro-orm.config";
import { Post } from './entities/Post';

const main = async () => {
  console.log("dirname", __dirname)
  console.log("something changed....")

  const orm = await MikroORM.init(microConfig);//connect to db
  await orm.getMigrator().up; // run migrations
  // 
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  // run sql
  const post = orm.em.create(Post, {title: "first title"});
  await orm.em.persistAndFlush(post);
};

  main().catch((err) => {
    console.log("**-----ANY ERRORRS?????? -------*", err);
  });

