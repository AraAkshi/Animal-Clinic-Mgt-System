import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  nic: string;

  @Column()
  contact: number;

  @Column()
  epfNo: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  designation: string;

  @Column({ default: Date.now() })
  enteredDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
