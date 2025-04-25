import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  @Index({ unique: true })
  public idArtist!: string;

  @Column({ nullable: false })
  @Index()
  public strArtist!: string;

  @CreateDateColumn()
  public registered?: Date;
}
