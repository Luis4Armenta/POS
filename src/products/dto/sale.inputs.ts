import { InputType, Float, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class SaleDetailInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Float)
  amount: number;
}

@InputType()
export class DoSaleInput {
  @Field(() => [SaleDetailInput], {
    description: 'identificadores de los productos comprados y cantidad',
  })
  products: SaleDetailInput[];
}

@InputType()
export class UpdateSaleInput extends PartialType(DoSaleInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
