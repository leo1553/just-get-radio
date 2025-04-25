import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistDataService, ArtistEntity } from './entities/artist';
import { MusicVideoDataService, MusicVideoEntity } from './entities/music-video';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './db/db.sqlite',
      entities: [ArtistEntity, MusicVideoEntity],
      synchronize: true, // TODO: desabilitar em produção
    }),
    TypeOrmModule.forFeature([ArtistEntity, MusicVideoEntity]),
  ],
  providers: [
    ArtistDataService,
    MusicVideoDataService,
  ],
  exports: [
    TypeOrmModule.forFeature([ArtistEntity, MusicVideoEntity]),
    ArtistDataService,
    MusicVideoDataService,
  ],
})
export class DbModule { }
