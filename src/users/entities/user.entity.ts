import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
 declare id: number;

  @Column({ unique: true })
  declare email: string;

  @Column()
  declare password: string;

  @Column({ unique: true })
  declare phone: string;

  @Column({ default: false })
  declare is_email_verified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;
}
