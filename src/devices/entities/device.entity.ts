import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  declare id: number;

  @ManyToOne(() => Profile, (profile) => profile.devices, {
    onDelete: 'CASCADE',
  })
  declare profile: Profile;

  @Column()
  declare device_type: string;

  @Column()
  declare device_name: string;

  @Column({ nullable: true })
  declare os: string;

  @Column({ type: 'timestamp', nullable: true })
  declare last_seen_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;
}
