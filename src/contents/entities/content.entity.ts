import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Comment } from 'src/comments/entities/comment.entity';
// import { MediaFile } from 'src/media_files/entities/media_file.entity';
// import { Thumbnail } from 'src/thumbnails/entities/thumbnail.entity';
// import { Episode } from 'src/episodes/entities/episode.entity';
// import { ContentCategory } from 'src/content_categories/entities/content_category.entity';
// import { ContentTag } from 'src/content_tags/entities/content_tag.entity';
// import { Rating } from 'src/ratings/entities/rating.entity';
// import { WatchHistory } from 'src/watch_histories/entities/watch-history.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare type: string;

  @Column()
  declare title: string;

  @Column({ type: 'text', nullable: true })
  declare description: string;

  @Column({ nullable: true })
  declare release_date: Date;

  @Column({ nullable: true })
  declare language: string;

  @Column({ nullable: true })
  declare country: string;

  @Column({ nullable: true })
  declare duration_minutes: number;

  @Column({ nullable: true })
  declare maturity_level: string;

  @Column({ default: false })
  declare is_published: boolean;

  @Column({ nullable: true })
  declare trailer_url: string;

  @CreateDateColumn({ name: 'created_at' })
  declare created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  declare updated_at: Date;

//   @OneToMany(() => MediaFile, (mf) => mf.content)
//   declare media_files: MediaFile[];

//   @OneToMany(() => Thumbnail, (th) => th.content)
//   declare thumbnails: Thumbnail[];

//   @OneToMany(() => Episode, (ep) => ep.content)
//   declare episodes: Episode[];

//   @OneToMany(() => Comment, (c) => c.content)
//   declare comments: Comment[];

//   @OneToMany(() => ContentCategory, (cc) => cc.content)
//   declare content_categories: ContentCategory[];

//   @OneToMany(() => ContentTag, (ct) => ct.content)
//   declare content_tags: ContentTag[];

//   @OneToMany(() => Rating, (r) => r.content)
//   declare ratings: Rating[];

//   @OneToMany(() => WatchHistory, (wh) => wh.content)
//   declare watch_histories: WatchHistory[];
}
