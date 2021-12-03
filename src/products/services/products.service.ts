import { Injectable } from '@nestjs/common';
import { CreateProductInput, UpdateProductInput } from '../dto/products.inputs';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModdel: Model<ProductDocument>,
  ) {}

  create(payload: CreateProductInput) {
    const createdProduct = new this.productModdel(payload);
    return createdProduct.save();
  }

  findAll() {
    return this.productModdel.find().exec();
  }

  findOneById(_id: MongooseSchema.Types.ObjectId) {
    return this.productModdel.findById(_id).exec();
  }

  findOneByBarcode(barcode: string) {
    return this.productModdel.findOne({ barcode: barcode }).exec();
  }

  update(_id: MongooseSchema.Types.ObjectId, payload: UpdateProductInput) {
    return this.productModdel
      .findByIdAndUpdate(_id, payload, { new: true })
      .exec();
  }

  remove(_id: MongooseSchema.Types.ObjectId) {
    return this.productModdel.findByIdAndDelete(_id).exec();
  }
}
