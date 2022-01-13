import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  // craete class and decorate with @Resolver decorator
  @Query(() => String)
  hello() {
    return "hello worldddd from resolver"
  }
}