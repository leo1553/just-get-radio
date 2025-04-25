import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { PostPlaylistRequest, PostPlaylistResponse } from './playlist.models';
import { PlaylistService } from './playlist.service';

@Controller('api/playlist')
export class PlaylistPutController {
  constructor(
    private readonly playlistService: PlaylistService,
  ) { }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, type: Number, description: 'ID da playlist' })
  @ApiBody({ type: PostPlaylistRequest, description: 'Dados da playlist a ser inserida' })
  public handlePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PostPlaylistRequest,
  ): Promise<PostPlaylistResponse> {
    return this.playlistService.putPlaylist(id, body);
  }
}
