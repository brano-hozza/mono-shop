import { Field, ObjectType } from '@nestjs/graphql';
import { UUID } from 'src/common/helpers/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProduct } from '../interfaces/product.interface';

@ObjectType()
@Entity()
export class Product implements IProduct {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column({ length: 500, nullable: false })
  description: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
