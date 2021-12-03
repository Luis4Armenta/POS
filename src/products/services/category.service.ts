import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Category, CategoryDocument } from '../entities/category.entity';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dto/category.inputs';

@Injectable()
export class CategorysService {
  constructor(
    @InjectModel(Category.name) private categoryModdel: Model<CategoryDocument>,
  ) {}

  create(payload: CreateCategoryInput) {
    const createdcategory = new this.categoryModdel(payload);
    return createdcategory.save();
  }

  findAll() {
    return this.categoryModdel.find().exec();
  }

  findOneById(_id: MongooseSchema.Types.ObjectId) {
    return this.categoryModdel.findById(_id).exec();
  }

  update(_id: MongooseSchema.Types.ObjectId, payload: UpdateCategoryInput) {
    return this.categoryModdel
      .findByIdAndUpdate(_id, payload, { new: true })
      .exec();
  }

  remove(_id: MongooseSchema.Types.ObjectId) {
    return this.categoryModdel.findByIdAndDelete(_id).exec();
  }
}
