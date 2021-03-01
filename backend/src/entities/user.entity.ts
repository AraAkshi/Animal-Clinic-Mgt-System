import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
const bcrypt = require('bcrypt');

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
