import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { CustomerEntity } from './customer.entity';

@Entity('treatment')
export class TreatmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.treatments)
  customer: CustomerEntity;

  @ManyToOne(() => AnimalEntity, (animal) => animal.treatments)
  animal: AnimalEntity;

  @Column('text', { array: true, nullable:true })
  itemsUsed: string[];

  @Column({ type: 'varchar' })
  treatmentType: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column()
  dateReceived: Date;

  @Column({ type: 'varchar' })
  timeReceived: string;

  @Column()
  nextTreatmentDate: Date;
}
