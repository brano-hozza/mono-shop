import { plainToClass } from 'class-transformer';
import { UUID } from 'src/common/helpers/types';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ModelEntity } from '../common/serializers/model.serializer';
export class ModelRepository<T extends ModelEntity> extends Repository<T> {
  constructor(protected repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async get(id: UUID, relations: string[] = []): Promise<T | null> {
    try {
      return this.transform(
        await this.findOneOrFail({
          where: {
            id: id as any,
          },
          relations,
        }),
      );
    } catch (e) {
      return null;
    }
  }
  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<T> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }
  async updateEntity(
    entity: T,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<T> {
    return this.update(entity.id, inputs)
      .then(async () => await this.get(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }
  transform(model: T | null, transformOptions = {}): T {
    return model
      ? (plainToClass(ModelEntity, model, transformOptions) as T)
      : null;
  }
  transformMany(models: T[], transformOptions = {}): T[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
