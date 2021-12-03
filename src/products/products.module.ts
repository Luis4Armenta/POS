import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './products.resolver';

@Module({
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
