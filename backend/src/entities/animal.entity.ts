import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { CustomerEntity } from './customer.entity';
import { PetTypeEntity } from './petType.entity';
import { TreatmentEntity } from './treatment.entity';

@Entity('animal')
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, (owner) => owner.animal)
  owner: CustomerEntity;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => PetTypeEntity, (type) => type.animal)
  type: PetTypeEntity;

  @Column({ type: 'varchar', nullable: true })
  breed: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  bloodGroup: string;

  @Column({ type: 'varchar', nullable: true })
  remarks: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column()
  enteredDate: Date;

  @OneToMany(() => TreatmentEntity, (treatment) => treatment.animal)
  treatments: TreatmentEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.animal)
  appointments: AppointmentEntity[];

  @Column({ default: true })
  isActive: boolean;
}
