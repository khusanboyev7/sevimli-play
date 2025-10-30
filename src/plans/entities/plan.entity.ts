import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare title: string;

  @Column()
  declare price: number;

  @Column({ nullable: true })
  declare currency: string;

  @Column({ nullable: true })
  declare billing_period: string;

  @Column({ nullable: true })
  declare video_quality: string;

  @Column({ nullable: true })
  declare max_profiles: number;

  @Column({ nullable: true })
  declare concurrent_streams: number;

  @OneToMany(() => Subscription, (sub) => sub.plan)
  declare subscriptions: Subscription[];

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;
}
