import { MyContext } from './../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
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

@ObjectType()
class FieldError {// does field have an error
  @Field()
  field: string;
  @Field()
  message: string;

}
@ObjectType()
class UserResponse {
  // upon creating user if improper return error
  // user response returns user if worked properly 
  // or return error if not
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field( () => User, {nullable: true})
  user?: User
  
}


@Resolver()
export class UserResolver {
  // craete class and decorate with @Resolver decorator
  // @Mutation(() => String)
  // @Mutation(() => User)
  @Mutation(() => UserResponse) // update to use error handling
  async register(
    @Arg('userOptions') userOptions: UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ): Promise<UserResponse>{
     if (userOptions.username.length <= 2) {
      return {
        errors: [{
          field: "username",
          message: "username length is too short, needs to be 2 or more characters"
        }]
      }
    }
    if (userOptions.password.length <= 3) {
      return {
        errors: [{
          field: "password",
          message: "password length is too short, needs to be 3 or more characters"
        }]
      }
    }
    const hashedPassword = await argon2.hash(userOptions.password)// since it returns a promise, await it
    const user =  em.create(User, {
      username: userOptions.username,
      password: hashedPassword // we save this in DB
    });// do not want to pass the user pw
    try {
      await em.persistAndFlush(user) //saves user to DB do not want to use plain text version of pw either we will encrpty with argon2
    } catch(err) {
      if (err.code === '23505' || err.detail.includes("already exists")) {
        // duplicate username error
      return {
        errors: [
          {
          field: "username",
          message: "username already taken"
        },
      ],
      };
      }
      console.log("message", err.message)
    }

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    // login returns userResponse
    @Arg('userOptions') userOptions: UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ): Promise<UserResponse> {
    // look up user by username
    // findOrFail also
    const user = await em.findOne(User, { username: userOptions.username.toLowerCase()})
    // error handling if no user found
    if (!user) {
      return {
        errors:[{
          field: 'username',
          message: 'that username does not exist'
        }]
      }
    }
    const valid = await argon2.verify(user.password, userOptions.password) // compares hashed pw with pw input
    if (!valid) {
      return {
        errors:[{
          field: 'password',
          message: 'incorrect password entered'
        }]
      }
    }
    //if user found and pw correct then user successfully entered and login granted
    return {
      user
  }
}
}
