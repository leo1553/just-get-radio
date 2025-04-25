import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { In, Like, Repository } from 'typeorm';
import { MusicVideoEntity } from './music-video.entity';

@Injectable()
export class MusicVideoDataService {
  constructor(
    @InjectRepository(MusicVideoEntity)
    public readonly repository: Repository<MusicVideoEntity>,
  ) { }

  public findById(id: string): Observable<MusicVideoEntity | null> {
    return from(this.repository.findOne({ where: { idTrack: id } }));
  }

  public findByArtist(id: string): Observable<MusicVideoEntity[]> {
    return from(this.repository.find({ where: { idArtist: id } }));
  }

  public findByName(name: string): Observable<MusicVideoEntity[]> {
    return from(this.repository.find({ where: { strTrack: Like(`%${name}%`) } }));
  }

  public async insertMany(artists: MusicVideoEntity[]): Promise<void> {
    const existing = await this.repository
      .find({ where: { idTrack: In(artists.map(artist => artist.idTrack)) } });
    const _new = artists.filter(artist => !existing
      .some(existingArtist => existingArtist.idTrack === artist.idTrack));
    await this.repository.save(_new);
  }
}
