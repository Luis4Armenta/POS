import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { DoSaleInput, UpdateSaleInput } from '../dto/sale.inputs';
import { Product, ProductDocument } from '../entities/product.entity';
import { ProductSale, Sale, SaleDocument } from '../entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async doSale(payload: DoSaleInput) {
    const date = new Date();
    const ids = payload.products.map((product) => product._id);
    const products: any[] = await this.productModel
      .find()
      .where('_id')
      .in(ids)
      .exec();
    const productsToSale: ProductSale[] = [];
    let total = 0;

    products.forEach((product) => {
      payload.products.forEach((element) => {
        if (element._id == product._id) {
          total = total + element.amount * product.price;
          product.stock = product.stock - element.amount;
          product.save();

          productsToSale.push({
            _id: product._id,
            amount: element.amount,
            cost: product.cost,
            name: product.name,
            price: product.price,
            totalCost: element.amount * product.cost,
            totalPrice: element.amount * product.price,
          });
          return;
        }
      });
    });

    const createdSale = new this.saleModel({
      date: date,
      products: productsToSale,
      total: total,
    });
    return await createdSale.save();
  }

  findAll() {
    return this.saleModel.find().exec();
  }

  findOneById(_id: MongooseSchema.Types.ObjectId) {
    return this.saleModel.findById(_id).exec();
  }

  async update(_id: MongooseSchema.Types.ObjectId, payload: UpdateSaleInput) {
    const date = new Date();
    const ids = payload.products.map((product) => product._id);
    const products: any[] = await this.saleModel
      .find()
      .where('_id')
      .in(ids)
      .exec();
    const productsToSale: ProductSale[] = [];
    let total = 0;

    products.forEach((product) => {
      payload.products.forEach((element) => {
        total += element.amount * product.price;
        if (element._id == product._id) {
          productsToSale.push({
            _id: product._id,
            amount: element.amount,
            cost: product.cost,
            name: product.name,
            price: product.price,
            totalCost: element.amount * product.cost,
            totalPrice: element.amount * product.price,
          });
          return;
        }
      });
    });
    return this.saleModel
      .findByIdAndUpdate(
        _id,
        {
          date: date,
          products: productsToSale,
          total: total,
        },
        { new: true },
      )
      .exec();
  }
  remove(_id: MongooseSchema.Types.ObjectId) {
    return this.saleModel.findByIdAndDelete(_id).exec();
  }
}
