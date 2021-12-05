import { Field, ObjectType, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class ProductSale {
  @Field(() => String, {
    description: 'Identificador único del producto vendido',
  })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, {
    description: 'Nombre del producto vendido',
  })
  name: string;

  @Field(() => Float, {
    description: 'Cantidad o número de piezas del producto vendido',
  })
  amount: number;

  @Field(() => Float, {
    description: 'Costo unitario del producto cuando fue vendido',
  })
  cost: number;

  @Field(() => Float, {
    description: 'Precio unitario al publico cuando el producto fue vendido',
  })
  price: number;

  @Field(() => Float, {
    description: 'Total del precio por la cantidad',
  })
  totalPrice: number;
  @Field(() => Float, {
    description: 'Total del costo por la cantidad',
  })
  totalCost: number;
}

@ObjectType()
@Schema()
export class Sale {
  @Field(() => String, {
    description: 'Identificador único de cada venta',
  })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Date, {
    description: 'Fecha y hora de la venta',
  })
  @Prop({ required: true })
  date: Date;

  @Field(() => [ProductSale], {
    description: 'Productos de la venta en esa hora y fecha',
  })
  @Prop({ required: true, type: [] })
  products: ProductSale[];

  @Field(() => Float, {
    description:
      'Total de la suma de los precios de los productos y sus cantidades',
  })
  @Prop({ required: true })
  total: number;
}

export type SaleDocument = Sale & Document;
export const SaleSchema = SchemaFactory.createForClass(Sale);
