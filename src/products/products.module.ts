import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './products.resolver';
import { Product, ProductSchema } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './entities/brand.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { CategorysService } from './services/category.service';
import { BrandsService } from './services/brands.service';
import { CategoriesResolver } from './categories.resolver';
import { BrandsResolver } from './brands.resolver';
import { Sale, SaleSchema } from './entities/sale.entity';
import { SaleService } from './services/sale.service';

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
      {
        name: Sale.name,
        schema: SaleSchema,
      },
    ]),
  ],
  providers: [
    CategoriesResolver,
    BrandsResolver,
    ProductsResolver,
    ProductsService,
    CategorysService,
    BrandsService,
    SaleService,
  ],
})
export class ProductsModule {}
