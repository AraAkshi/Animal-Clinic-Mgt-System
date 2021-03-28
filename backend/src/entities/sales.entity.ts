import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductCategoryEntity } from './productCategory.entity';

@Entity('sales')
export class SalesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.item)
  category: ProductCategoryEntity;

  @Column()
  soldQty: number;

  @Column()
  amount: number;

  @Column()
  soldDate: Date;
}
