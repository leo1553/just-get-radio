import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistDataService, ArtistEntity } from './entities/artist';
import { MusicVideoDataService, MusicVideoEntity } from './entities/music-video';
import { PlaylistDataService, PlaylistEntity } from './entities/playlist';

const ENTITIES = [
  ArtistEntity,
  MusicVideoEntity,
  PlaylistEntity,
];

const DATA_SERVICES = [
  ArtistDataService,
  MusicVideoDataService,
  PlaylistDataService,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './db/db.sqlite',
      entities: ENTITIES,
      synchronize: true, // TODO: desabilitar em produção
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  providers: DATA_SERVICES,
  exports: [
    TypeOrmModule.forFeature(ENTITIES),
    ...DATA_SERVICES,
  ],
})
export class DbModule { }
