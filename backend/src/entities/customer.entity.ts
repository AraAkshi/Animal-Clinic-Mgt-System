import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { AppointmentEntity } from './appointment.entity';
import { TreatmentEntity } from './treatment.entity';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column()
  contact: number;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  remarks: string;

  @Column()
  enteredDate: Date;

  @OneToMany(() => AnimalEntity, (animal) => animal.owner)
  animal: AnimalEntity[];

  @OneToMany(() => TreatmentEntity, (treatment) => treatment.customer)
  treatments: TreatmentEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.customer)
  appointments: AppointmentEntity[];

  @Column({ default: true })
  isActive: boolean;
}
