import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search';

@Module({
  imports: [
    SearchModule,
  ],
})
export class AppModule { }
