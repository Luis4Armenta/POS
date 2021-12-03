import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './products.resolver';
import { Product, ProductSchema } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './entities/brand.entity';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
