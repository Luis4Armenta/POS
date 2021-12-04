import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './dto/products.inputs';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productsService.findOneById(_id);
  }

  @Query(() => Product, { name: 'product' })
  async findOneByBarcode(
    @Args('barcode', { type: () => String })
    barcode: string,
  ) {
    return this.productsService.findOneByBarcode(barcode);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput._id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  async removeProduct(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productsService.remove(_id);
  }
}
