import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AnimalEntity } from './animal.entity';

@Entity('petType')
export class PetTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.type)
  animal: AnimalEntity[];
}
