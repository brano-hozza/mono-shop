import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ModelRepository } from '../models.repository';
import { Product } from './entities/product.entity';
import {
  allProductGroupsForSerializing,
  ProductEntity,
} from './serializers/products.serializer';

@Injectable()
export class ProductsRepository extends ModelRepository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    protected repository: Repository<ProductEntity>,
  ) {
    super(repository);
  }
  transform(model: Product): ProductEntity {
    const tranformOptions = {
      groups: allProductGroupsForSerializing,
    };
    return plainToInstance(
      ProductEntity,
      instanceToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Product[]): ProductEntity[] {
    return models.map((model) => this.transform(model));
  }
}
