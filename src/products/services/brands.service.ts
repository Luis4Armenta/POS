import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Brand, BrandDocument } from '../entities/brand.entity';
import { CreateBrandInput, UpdateBrandInput } from '../dto/brands.inputs';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private BrandModdel: Model<BrandDocument>,
  ) {}

  create(payload: CreateBrandInput) {
    const createdBrand = new this.BrandModdel(payload);
    return createdBrand.save();
  }

  findAll() {
    return this.BrandModdel.find().exec();
  }

  findOneById(_id: MongooseSchema.Types.ObjectId) {
    return this.BrandModdel.findById(_id).exec();
  }

  update(_id: MongooseSchema.Types.ObjectId, payload: UpdateBrandInput) {
    return this.BrandModdel.findByIdAndUpdate(_id, payload, {
      new: true,
    }).exec();
  }

  remove(_id: MongooseSchema.Types.ObjectId) {
    return this.BrandModdel.findByIdAndDelete(_id).exec();
  }
}
