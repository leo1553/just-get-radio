import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';
import { MusicVideoDataService } from 'src/data-provider/db/entities/music-video';
import { PlaylistDataService, PlaylistEntity } from 'src/data-provider/db/entities/playlist';
import { GetPlaylistResponse, PostPlaylistRequest, PostPlaylistResponse } from './playlist.models';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly musicVideoDataService: MusicVideoDataService,
    private readonly playlistDataService: PlaylistDataService,
  ) { }

  public getAllPlaylists(): Observable<GetPlaylistResponse[]> {
    return this.playlistDataService.all().pipe(
      map(playlists => playlists.map(playlist => this.playlistDataService.mapToPlaylist(playlist))),
    );
  }

  public getPlaylist(id: number): Observable<GetPlaylistResponse | null> {
    return this.playlistDataService.findById(id).pipe(
      map(playlist => {
        if (!playlist)
          return null;

        return this.playlistDataService.mapToPlaylist(playlist);
      }),
    );
  }

  public async postPlaylist(body: PostPlaylistRequest): Promise<PostPlaylistResponse | null> {
    const playlist = new PlaylistEntity();
    playlist.name = body.name;
    playlist.songs = await this.musicVideoDataService.findByIds(body.songs).toPromise();

    const result = await this.playlistDataService.save(playlist);

    return this.playlistDataService.mapToPlaylist(result);
  }

  public async putPlaylist(id: number, body: PostPlaylistRequest): Promise<PostPlaylistResponse | null> {
    const playlist = await firstValueFrom(this.playlistDataService.findById(id));
    if (!playlist)
      return null;

    playlist.name = body.name;
    playlist.songs = await firstValueFrom(this.musicVideoDataService.findByIds(body.songs));

    const result = await this.playlistDataService.save(playlist);

    return this.playlistDataService.mapToPlaylist(result);
  }

  public async deletePlaylist(id: number): Promise<void> {
    const playlist = await firstValueFrom(this.playlistDataService.findById(id));
    if (!playlist)
      return;

    await this.playlistDataService.delete(playlist.id);
  }
}
