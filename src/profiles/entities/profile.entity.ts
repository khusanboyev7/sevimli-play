import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Device } from 'src/devices/entities/device.entity';
// import { Rating } from 'src/ratings/entities/rating.entity';
// import { WatchHistory } from 'src/watch_histories/entities/watch-history.entity';
// import { Comment } from 'src/comments/entities/comment.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  declare id: number;

  @ManyToOne(() => User, (user) => user.profiles, { onDelete: 'CASCADE' })
  declare user: User;

  @Column()
  declare display_name: string;

  @Column({ nullable: true })
  declare avatar_url: string;

  @Column({ nullable: true })
  declare language: string;

  @Column({ nullable: true })
  declare maturity_level: string;

  @Column({ default: false })
  declare is_default: boolean;

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;

  @OneToMany(() => Device, (device) => device.profile)
  declare devices: Device[];

//   @OneToMany(() => Rating, (rating) => rating.profile)
//   declare ratings: Rating[];

//   @OneToMany(() => WatchHistory, (wh) => wh.profile)
//   declare watch_histories: WatchHistory[];

//   @OneToMany(() => Comment, (c) => c.profile)
//   declare comments: Comment[];
}
