import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from './dtos/create.dto';
import { UpdateProductDTO } from './dtos/update.dto';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './serializers/products.serializer';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    protected readonly repository: ProductsRepository,
  ) {}
  async get(
    id: string,
    relations: string[] = [],
  ): Promise<ProductEntity | null> {
    return await this.repository.get(id, relations);
  }
  async create(inputs: CreateProductDTO): Promise<ProductEntity> {
    return await this.repository.createEntity(inputs);
  }
  async update(
    product: ProductEntity,
    inputs: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return await this.repository.updateEntity(product, inputs);
  }
}
