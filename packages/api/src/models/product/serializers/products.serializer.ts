import { Expose } from 'class-transformer';
import { ModelEntity } from 'src/common/serializers/model.serializer';
import { IProduct } from '../interfaces/product.interface';
export const defaultProductGroupsForSerializing: string[] = [
  'product.timestamps',
];
export const extendedProductGroupsForSerializing: string[] = [
  ...defaultProductGroupsForSerializing,
];
export const allProductGroupsForSerializing: string[] = [
  ...extendedProductGroupsForSerializing,
  'product.description',
];
export class ProductEntity extends ModelEntity implements IProduct {
  id: string;
  name: string;
  description: string;
  @Expose({ groups: ['product.timestamps'] })
  created_at: Date;
  @Expose({ groups: ['product.timestamps'] })
  updated_at: Date;
}
