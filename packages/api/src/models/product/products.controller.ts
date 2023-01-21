import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDTO } from './dtos/create.dto';
import { UpdateProductDTO } from './dtos/update.dto';
import { ProductsService } from './products.service';
import {
  extendedProductGroupsForSerializing,
  ProductEntity,
} from './serializers/products.serializer';
@Controller('Products')
@SerializeOptions({
  groups: extendedProductGroupsForSerializing,
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(product: ProductEntity): Promise<ProductEntity> {
    return product;
  }
  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateProductDTO): Promise<ProductEntity> {
    return await this.productsService.create(inputs);
  }
  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    product: ProductEntity,
    @Body() inputs: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return await this.productsService.update(product, inputs);
  }
}
