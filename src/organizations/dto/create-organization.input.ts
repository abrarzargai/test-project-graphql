import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
}
