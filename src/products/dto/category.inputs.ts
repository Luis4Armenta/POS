import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Nombre de la nueva categoría' })
  name: string;

  @Field(() => String, {
    description:
      'Dirección local o URL de una imagen que represente a la nueva categoría',
  })
  image: string;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
