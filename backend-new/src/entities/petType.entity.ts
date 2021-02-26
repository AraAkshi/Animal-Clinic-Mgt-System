import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('petType')
export class PetTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
