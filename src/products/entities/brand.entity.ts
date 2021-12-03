import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Brand {
  @Field(() => String, { description: 'Identificador de la marca' })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Nombre de la marca.' })
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => String, {
    description: 'Dirección local o URL de una imagen que represente la marca',
  })
  @Prop({ required: false })
  image: string;
}

export type BrandDocument = Brand & Document;
export const BrandSchema = SchemaFactory.createForClass(Brand);
