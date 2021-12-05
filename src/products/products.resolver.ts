import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './services/products.service';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './dto/products.inputs';
import { Schema as MongooseSchema } from 'mongoose';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { Sale } from './entities/sale.entity';
import { DoSaleInput } from './dto/sale.inputs';
import { SaleService } from './services/sale.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly saleService: SaleService,
  ) {}

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

  @Mutation(() => Sale)
  async doSale(@Args('doSaleInput') doSaleInput: DoSaleInput) {
    return this.saleService.doSale(doSaleInput);
  }

  @ResolveField()
  async brand(
    @Parent() product: ProductDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate) await product.populate({ path: 'brand', model: Brand.name });

    return product.brand;
  }

  @ResolveField()
  async category(
    @Parent() product: ProductDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await product.populate({ path: 'category', model: Category.name });

    return product.category;
  }
}
