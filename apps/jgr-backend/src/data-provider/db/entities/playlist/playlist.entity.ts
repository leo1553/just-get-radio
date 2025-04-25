import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MusicVideoEntity } from '../music-video';

@Entity()
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  @Index()
  public name!: string;

  @CreateDateColumn()
  public registered?: Date;

  @ManyToMany(() => MusicVideoEntity)
  @JoinTable()
  public songs?: MusicVideoEntity[];
}
