import { Module } from '@nestjs/common';
import { DbModule } from 'src/data-provider/db/db.module';
import { TheAudioDBModule } from 'src/data-provider/the-audio-db';
import { PlaylistDeleteController } from './playlist-delete.controller';
import { PlaylistGetController } from './playlist-get.controller';
import { PlaylistPostController } from './playlist-post.controller';
import { PlaylistPutController } from './playlist-put.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [
    DbModule,
    TheAudioDBModule,
  ],
  controllers: [
    PlaylistGetController,
    PlaylistPostController,
    PlaylistPutController,
    PlaylistDeleteController,
  ],
  providers: [
    PlaylistService,
  ],
  exports: [
    PlaylistService,
  ],
})
export class PlaylistModule { }
