import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Payment } from 'src/payments/entities/payment.entity';

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

  // 🧩 Relation: 1 user → ko‘p subscriptions
  @OneToMany(() => Subscription, (sub) => sub.user)
  declare subscriptions: Subscription[];

  // 💳 Relation: 1 user → ko‘p payments
  @OneToMany(() => Payment, (payment) => payment.user)
  declare payments: Payment[];

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;
}
