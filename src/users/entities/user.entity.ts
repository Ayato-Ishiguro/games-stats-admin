import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  Column,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'create_at' })
  readonly createdAt?: Timestamp;

  @UpdateDateColumn({ name: 'update_at' })
  readonly updateAt?: string;
}
