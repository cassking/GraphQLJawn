import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity()
export class Post {

  @PrimaryKey() // db column
  id!: number;

  @Property() // db column
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  title!: string;
}