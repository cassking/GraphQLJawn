import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
// can easily turn classes like this one into GraphQL type
// use the object converter @ObjectType()
// @Field exposes it to GraphQL Schema

// @Field() // if there is a field you do NOT want to expose, then exclude this type/entity

@ObjectType() // both object tuype and entity
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ type: 'text', unique: true})
  username!: string;

  // no pw filed exposed to GraphQL schema this is only a db column
  @Property({ type: 'text'})
  password!: string;
}