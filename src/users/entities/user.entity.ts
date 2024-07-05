import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: 'User Email' })
  email: string;

  @Field(() => String, { description: 'User Password' })
  password: string;

  @Field(() => String, { description: 'User Password' })
  name: string;
}
