import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { PostPlaylistRequest, PostPlaylistResponse } from './playlist.models';
import { PlaylistService } from './playlist.service';

@Controller('api/playlist')
export class PlaylistPostController {
  constructor(
    private readonly playlistService: PlaylistService,
  ) { }

  @Post()
  @ApiBody({ type: PostPlaylistRequest, description: 'Dados da playlist a ser inserida' })
  public handlePost(
    @Body() body: PostPlaylistRequest,
  ): Promise<PostPlaylistResponse> {
    return this.playlistService.postPlaylist(body);
  }
}
