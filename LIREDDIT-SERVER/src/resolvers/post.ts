import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  // craete class and decorate with @Resolver decorator
  @Query(() => [Post])
    posts(
      // @Ctx() ctx: MyContext
      @Ctx() {em}: MyContext): Promise<Post[]> {
      return em.find(Post, {})
  }
}