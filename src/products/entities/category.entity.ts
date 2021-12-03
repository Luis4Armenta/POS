import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Category {
  @Field(() => String, {
    description: 'Identificador de la categoría dentro del sistema',
  })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Nombre de la categoría' })
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => String, {
    description:
      'Dirección local o URL de una imagen que represente a la categoría',
  })
  @Prop({ required: false, unique: false })
  image: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
