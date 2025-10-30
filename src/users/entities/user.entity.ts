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
import { Profile } from 'src/profiles/entities/profile.entity';

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

  @OneToMany(() => Subscription, (sub) => sub.user)
  declare subscriptions: Subscription[];

  @OneToMany(() => Payment, (payment) => payment.user)
  declare payments: Payment[];

  @OneToMany(() => Profile, (profile) => profile.user)
  declare profiles: Profile[];

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;
}
