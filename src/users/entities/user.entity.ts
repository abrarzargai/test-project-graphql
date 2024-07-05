import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: string;

  @Field(() => String, { description: 'User Email' })
  email: string;

  @Field(() => String, { description: 'User Password' })
  password: string;

  @Field(() => String, { description: 'User Password' })
  name: string;
}
