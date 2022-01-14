import { __prod__ } from './constants';
import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core';
import microConfig from "./mikro-orm.config";
// import { Post } from './entities/Post';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';


// for all awaits if looking at type of return and is promise use await
const main = async () => {
  console.log("dirname", __dirname)


  const orm = await MikroORM.init(microConfig);
  // ^^ connect to db
  await orm.getMigrator().up;
  // ^^run migrations automatically

  // without this, apollo will throw an error.
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false // for now
    }),
    // context special object that is accessible by all resolvers
    // context: (req, res) => ({ em: orm.em })
    context: () => ({ em: orm.em })

  });
  await apolloServer.start();
  // below creates a GraphQL endpooint for our app
  apolloServer.applyMiddleware({ 
    app,
    cors: true
  });


  // test sever use
  // this creates a GET endopoint
  app.get('/', (req, res) => {
    console.log("request from server", req);
    res.send("************************hello from SERVER????******************");
  })
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  // run sql
  // const post = orm.em.create(Post, {title: "first title"});
  // await orm.em.persistAndFlush(post);

  /// can see posts here in console
  // const posts = await orm.em.find(Post, {})
  // console.log(posts)

  app.listen(4000, () => {// listen on port 4000 or any port you choose
    console.log("something changed....")
    console.log("*****************xx***********************-------SERVER STARTED ON localhost:4000-----*****")
  });
};

  main().catch((err) => {
    console.log("**************************-----ANY ERRORRS?????? -------***********************", err);
  });


