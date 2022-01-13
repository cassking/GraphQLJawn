
import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import microConfig from "./mikro-orm.config";
// import { Post } from './entities/Post';
import express from 'express';

const main = async () => {
  console.log("dirname", __dirname)
  console.log("something changed....")

  const orm = await MikroORM.init(microConfig);//connect to db
  await orm.getMigrator().up; // run migrations automatically
  //
  const app = express();
  app.listen(4000, () => {// listen on port 4000 or any port you choose
    console.log("****-------server started on localhost:4000------*****")
  });
  app.set("trust proxy", 1);
  // test sever use
  // this creates a GET endopoint
  app.get('/', (req, res) => {
    console.log("request from server", req);
    res.send("hello from SERVER????");
  })
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  // run sql
  // const post = orm.em.create(Post, {title: "first title"});
  // await orm.em.persistAndFlush(post);

  /// can see posts here in console
  // const posts = await orm.em.find(Post, {})
  // console.log(posts)
};

  main().catch((err) => {
    console.log("**-----ANY ERRORRS?????? -------*", err);
  });

