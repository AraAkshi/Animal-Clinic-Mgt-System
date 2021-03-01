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

  @Column({ type: 'varchar', nullable: true })
  brand: string;

  @Column()
  unitPurchasePrice: number;

  @Column()
  unitSellingPrice: number;

  @Column({ type: 'varchar' })
  batchNo: string;

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
  notifyBefore: number;

  @Column()
  expireDate: Date;

  @Column()
  addedDate: Date;
}
