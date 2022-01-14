import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Query, Resolver, Int, Mutation} from "type-graphql";

@Resolver()
export class PostResolver {
  // craete class and decorate with @Resolver decorator
  @Query(() => [Post])
    posts( // C Reading UD - just show all posts
      // @Ctx() ctx: MyContext
      @Ctx() {em}: MyContext): Promise<Post[]> {
      return em.find(Post, {})
  }


  @Query(() => Post, { nullable: true})
    post( // C Reading UD - just show one post based on what id fed
      @Arg('id', () => Int) id: number,
      //'id'could also be 'identifier' or 'poop' just what to call id
      @Ctx() {em}: MyContext): Promise<Post | null> {
      return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
    async createPost( // Create RUD - create new post
      @Arg('title') title: string,
      //'id'could also be 'identifier' or 'poop' just what to call 
      @Ctx() {em}: MyContext): Promise<Post | null> {
        const post  = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post
  }

  @Mutation(() => Post, { nullable: true })
    async updatePost( // CR Update D - create new post
      @Arg('id') id: number,
      @Arg('title', () => String, {nullable: true}) title: string,
      @Ctx() { em }: MyContext
      ): Promise<Post | null> {
        const post = await em.findOne(Post, {id});
        if (!post) {
          return null
        }
        post.title = title
        return post
  }

}