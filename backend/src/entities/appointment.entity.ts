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
  scheduleDate: Date;

  @Column({ type: 'varchar' })
  scheduleTime: string;

  @Column()
  remarks: string;

  @Column()
  addedDate: Date;

  @Column({ default: false })
  isAttended: boolean;
}
