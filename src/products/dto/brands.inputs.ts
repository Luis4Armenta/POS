import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateBrandInput {
  @Field(() => String, { description: 'Nombre de la nueva marca' })
  name: string;

  @Field(() => String, {
    description:
      'Dirección local o URL de una imagen que represente a la nueva marca',
  })
  image: string;
}

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
