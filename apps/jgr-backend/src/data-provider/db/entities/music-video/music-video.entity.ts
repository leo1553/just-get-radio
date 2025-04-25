import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MusicVideoEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  @Index({ unique: true })
  public idTrack!: string;

  @Column({ nullable: false })
  @Index()
  public idAlbum!: string;

  @Column({ nullable: false })
  @Index()
  public idArtist!: string;

  @Column({ nullable: false })
  @Index()
  public strTrack!: string;

  @Column({ nullable: true })
  @Index()
  public strAlbum?: string;

  @Column({ nullable: false })
  @Index()
  public strArtist!: string;

  @Column({ nullable: false })
  public intDuration!: string;

  @Column({ nullable: true })
  public strTrackThumb?: string;

  @Column({ nullable: false })
  public strMusicVid!: string;

  @CreateDateColumn()
  public registered?: Date;
}
