import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Agent } from 'https';
import { TheAudioDBService } from './the-audio-db.service';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({ rejectUnauthorized: false }), // TODO: remover em produção
    }),
  ],
  providers: [
    TheAudioDBService,
  ],
  exports: [
    TheAudioDBService,
  ],
})
export class TheAudioDBModule { }
