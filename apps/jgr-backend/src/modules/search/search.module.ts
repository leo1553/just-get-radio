import { Module } from '@nestjs/common';
import { DbModule } from 'src/data-provider/db/db.module';
import { TheAudioDBModule } from 'src/data-provider/the-audio-db';
import { SearchGetController } from './search-get.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    DbModule,
    TheAudioDBModule,
  ],
  controllers: [
    SearchGetController,
  ],
  providers: [
    SearchService,
  ],
  exports: [
    SearchService,
  ],
})
export class SearchModule {

}
