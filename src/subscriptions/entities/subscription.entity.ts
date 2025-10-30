import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  declare id: number;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  declare user: User;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions, { onDelete: 'CASCADE' })
  declare plan: Plan;

  @Column({ nullable: true })
  declare status: string;

  @Column({ type: 'timestamp', nullable: true })
  declare start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  declare end_date: Date;

  @Column({ default: true })
  declare auto_renew: boolean;

  @OneToMany(() => Payment, (payment) => payment.subscription)
  declare payments: Payment[];

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;
}
