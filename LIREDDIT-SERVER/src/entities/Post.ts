import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
// can easily turn classes like this one into GraphQL type
// use the object converter @ObjectType()
// @Field exposes it to GraphQL Schema
@ObjectType() // both object tuype and entity
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey() // db column
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field() // if there is a field you do NOT want to expose, then exclude this type/entity
  // type String is inferred here
  @Property({ type: 'text'})
  title!: string;
}