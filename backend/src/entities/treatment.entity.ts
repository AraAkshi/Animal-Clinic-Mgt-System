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

  @Column({ type: 'varchar' })
  treatmentType: string;

  @Column({ type: 'varchar' })
  decription: string;

  @Column()
  dateReceived: Date;

  @Column()
  timeReceived: Date;

  @Column()
  nextTreatmentDate: Date;
}
