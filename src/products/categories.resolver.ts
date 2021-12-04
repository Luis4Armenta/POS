import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategorysService } from './services/category.service';
import { Category } from './entities/category.entity';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './dto/category.inputs';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoryService: CategorysService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.categoryService.findOneById(_id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput._id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  async removeCategory(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.categoryService.remove(_id);
  }
}
