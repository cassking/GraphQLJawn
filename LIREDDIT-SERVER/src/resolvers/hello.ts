import { Query, Resolver } from "type-graphql";
// Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler. Every resolver function in a GraphQL schema accepts four positional arguments as given below −

// fieldName:(root, args, context, info) => { result }

@Resolver()
export class HelloResolver {
  // craete class and decorate with @Resolver decorator
  @Query(() => String)
  hello() {
    return "hello worldddd from resolver"
  }
}
