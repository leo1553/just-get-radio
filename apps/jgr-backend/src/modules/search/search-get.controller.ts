import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SearchResponse } from './search.models';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchGetController {
  constructor(
    private readonly searchService: SearchService,
  ) { }

  @Get()
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Conteúdo a ser procurado' })
  public handleGet(
    @Query('q') query: string,
  ): Observable<SearchResponse> {
    return this.searchService.search(query);
  }
}
