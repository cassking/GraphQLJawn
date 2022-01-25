import { MyContext } from './../types';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from '../entities/User';
import argon2 from 'argon2';

// Inputs are an alternate way to Args in GraphQL
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}


@Resolver()
export class UserResolver {
  // craete class and decorate with @Resolver decorator
  // @Mutation(() => String)
  @Mutation(() => User)
  async register(
    @Arg('userOptions') userOptions: UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ) {
    const hashedPassword = await argon2.hash(userOptions.password)// since it returns a promise, await it
    const user =  em.create(User, {
      username: userOptions.username,
      password: hashedPassword // we save this in DB
    })// do not want to pass the user pw
    await em.persistAndFlush(user) //saves user to DB do not want to use plain text version of pw either we will encrpty with argon2
    return user
  }
}