import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Playlist } from 'src/modules/playlist';
import { Like, Repository } from 'typeorm';
import { MusicVideoDataService } from '../music-video';
import { PlaylistEntity } from './playlist.entity';

@Injectable()
export class PlaylistDataService {
  constructor(
    @InjectRepository(PlaylistEntity)
    public readonly repository: Repository<PlaylistEntity>,
    public readonly musicVideoDataService: MusicVideoDataService,
  ) { }

  public all(): Observable<PlaylistEntity[]> {
    return from(this.repository.find({ relations: ['songs'] }));
  }

  public findById(id: number): Observable<PlaylistEntity | null> {
    return from(this.repository.findOne({ where: { id }, relations: ['songs'] }));
  }

  public findByName(name: string): Observable<PlaylistEntity[]> {
    return from(this.repository.find({ where: { name: Like(`%${name}%`) }, relations: ['songs'] }));
  }

  public async save(playlist: PlaylistEntity): Promise<PlaylistEntity> {
    return this.repository.save(playlist);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public mapToPlaylist(playlist: PlaylistEntity): Playlist {
    return {
      id: playlist.id!,
      name: playlist.name,
      songs: playlist.songs.map(mvid => this.musicVideoDataService.mapToSong(mvid)),
    };
  }
}
