import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@ObjectType()
@Schema()
export class Product {
  @Field(() => String, {
    description: 'Identificador del producto dentro del sistema',
  })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Código de barras del producto' })
  @Prop({ required: true, unique: true, index: true })
  barcode: string;

  @Field(() => String, { description: 'Nombre del producto' })
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => Brand, { description: 'Categoria a la que pertenece' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Brand.name })
  brand: MongooseSchema.Types.ObjectId | Brand;

  @Field(() => Category, {
    description: 'Categoría a la que pertenece el producto',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  category: MongooseSchema.Types.ObjectId | Category;

  @Field(() => Float, { description: 'Costo de adqusición del producto' })
  @Prop({ required: true })
  cost: number;

  @Field(() => Float, { description: 'Precio de venta al publico' })
  @Prop({ required: true })
  price: number;

  @Field(() => Float, {
    description:
      'Cantidad de unidades de este producto disponibles para la venta',
  })
  @Prop({ required: true })
  stock: number;

  @Field(() => Status, {
    description: 'Estado del articulo',
  })
  @Prop({ required: false, default: 'INSTOCK' })
  status: Status;

  @Field(() => String, {
    description: 'Imagen o fotografía del producto',
    nullable: true,
    defaultValue:
      'https://www.allianceplast.com/wp-content/uploads/no-image.png',
  })
  @Prop({ required: false })
  image: string;
}

export enum Status {
  INSTOCK = 'INSTOCK',
  OUTSTOCK = 'OUTSTOCK',
}

registerEnumType(Status, {
  name: 'status',
  description: 'Estado del producto',
  valuesMap: {
    INSTOCK: {
      description:
        'Valor por defecto. El producto se encuentra en stock y disponible para ser vendido',
    },
    OUTSTOCK: {
      description:
        'El producto se encuentra fuera de stock o tiene alguna condición que no le permite ser vendido',
    },
  },
});

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
