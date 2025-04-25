import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';

@Controller('api/playlist')
export class PlaylistDeleteController {
  constructor(
    private readonly playlistService: PlaylistService,
  ) { }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: Number, description: 'ID da playlist' })
  public handleDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.playlistService.deletePlaylist(id);
  }
}
