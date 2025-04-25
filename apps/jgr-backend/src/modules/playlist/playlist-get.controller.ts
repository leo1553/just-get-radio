import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GetPlaylistResponse } from './playlist.models';
import { PlaylistService } from './playlist.service';

@Controller('api/playlist')
export class PlaylistGetController {
  constructor(
    private readonly playlistService: PlaylistService,
  ) { }

  @Get()
  public handleGetAll(): Observable<GetPlaylistResponse[]> {
    return this.playlistService.getAllPlaylists();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: Number, description: 'ID da playlist' })
  public handleGet(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<GetPlaylistResponse | null> {
    return this.playlistService.getPlaylist(id);
  }
}
