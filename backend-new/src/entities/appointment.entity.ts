import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { CustomerEntity } from './customer.entity';

@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.appointments)
  customer: CustomerEntity;

  @ManyToOne(() => AnimalEntity, (animal) => animal.appointments)
  animal: AnimalEntity;

  @Column()
  scheduleDateTime: Date;

  @Column()
  remarks: string;

  @Column({ default: Date.now() })
  addedDate: Date;
}
