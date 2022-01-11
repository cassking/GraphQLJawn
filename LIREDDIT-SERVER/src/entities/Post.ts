import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity()
export class Post {

  @PrimaryKey() // db column
  id!: number ;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // date = new Date()
  // @Property({ type: DateType, length: 3 })
  // createdAt: Date;

  // @Property({ type: DateType, length: 3 })
  // updatedAt: Date;

  @Property()
  title!: string;
}