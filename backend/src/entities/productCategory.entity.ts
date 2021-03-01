import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InventoryEntity } from './inventory.entity';

@Entity('productCategory')
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable:true })
  imagePath: string;

  @OneToMany(() => InventoryEntity, (item) => item.category)
  item: InventoryEntity[];
}
