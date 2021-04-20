import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
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

  @Column({ type: 'varchar' , nullable: true})
  batchNo: string;

  @Column()
  quantity: number;

  @Column()
  soldQty: number;

  @Column({ default: 10 })
  bufferQty: number;

  @Column({ default: false })
  isEmpty: boolean;

  @Column({nullable: true})
  purchasedDate: Date;

  @Column({nullable: true})
  manufactureDate: Date;

  @Column({nullable: true})
  notifyBefore: number;

  @Column({nullable: true})
  expireDate: Date;

  @Column()
  addedDate: Date;
}
