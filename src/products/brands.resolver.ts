import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput, UpdateBrandInput } from './dto/brands.inputs';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandService: BrandsService) {}

  @Mutation(() => Brand)
  async createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
  ) {
    return this.brandService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brands' })
  async findAll() {
    return this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'brand' })
  async findOne(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.brandService.findOneById(_id);
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
  ) {
    return this.brandService.update(updateBrandInput._id, updateBrandInput);
  }

  @Mutation(() => Brand)
  async removeBrand(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.brandService.remove(_id);
  }
}
