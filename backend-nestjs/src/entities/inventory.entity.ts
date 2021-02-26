import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductCategoryEntity } from './productCategory.entity';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.item)
  category: ProductCategoryEntity;

  @Column({ type: 'varchar' })
  brand: string;

  @Column()
  unitPurchasePrice: number;

  @Column()
  unitSellingPrice: number;

  @Column()
  quantity: number;

  @Column({ default: 10 })
  bufferQty: number;

  @Column({ default: false })
  isEmpty: boolean;

  @Column()
  purchasedDate: Date;

  @Column()
  manufactureDate: Date;

  @Column()
  expireDate: Date;

  @Column({ default: Date.now() })
  addedDate: Date;
}
