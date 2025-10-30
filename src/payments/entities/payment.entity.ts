import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  declare id: number;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  declare user: User;

  @ManyToOne(() => Subscription, (sub) => sub.payments, { onDelete: 'CASCADE' })
  declare subscription: Subscription;

  @Column({ nullable: true })
  declare provider: string;

  @Column({ nullable: true })
  declare transaction_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  declare amount: number;

  @Column({ nullable: true })
  declare currency: string;

  @Column({ nullable: true })
  declare status: string;

  @Column({ default: false })
  declare paid: boolean;

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;
}
