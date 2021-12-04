import { InputType, Float, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Status } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Nombre del producto' })
  name: string;

  @Field(() => String, { description: 'Código de barras del producto' })
  barcode: string;

  @Field(() => String, {
    description: 'Identificador de la marca a la que pertenece',
  })
  brand: MongooseSchema.Types.ObjectId;

  @Field(() => String, {
    description: 'Identificador de la categoría a la que pertenece',
  })
  category: MongooseSchema.Types.ObjectId;

  @Field(() => Float, { description: 'Costo de adqusición del producto' })
  cost: number;

  @Field(() => Float, { description: 'Precio de venta al publico' })
  price: number;

  @Field(() => Float, {
    description:
      'Cantidad de unidades de este producto disponibles para la venta',
    nullable: true,
    defaultValue: 0,
  })
  stock: number;

  @Field(() => Status, {
    description: 'Estado del articulo',
    nullable: true,
    defaultValue: Status.INSTOCK,
  })
  status: Status;

  @Field(() => String, {
    description: 'Imagen o fotografía del producto',
    nullable: true,
    defaultValue:
      'https://www.allianceplast.com/wp-content/uploads/no-image.png',
  })
  image: string;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
