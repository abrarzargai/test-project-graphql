import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
}