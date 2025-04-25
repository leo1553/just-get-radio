import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search';
import { PlaylistModule } from './modules/playlist';

@Module({
  imports: [
    SearchModule,
    PlaylistModule,
  ],
})
export class AppModule { }
