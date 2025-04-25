import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { In, Like, Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistDataService {
  constructor(
    @InjectRepository(ArtistEntity)
    public readonly repository: Repository<ArtistEntity>,
  ) { }

  public findById(id: string): Observable<ArtistEntity | null> {
    return from(this.repository.findOne({ where: { idArtist: id } }));
  }

  public findByName(name: string): Observable<ArtistEntity[]> {
    return from(this.repository.find({ where: { strArtist: Like(`%${name}%`) } }));
  }

  public async insertMany(artists: ArtistEntity[]): Promise<void> {
    const existing = await this.repository
      .find({ where: { idArtist: In(artists.map(artist => artist.idArtist)) } });
    const _new = artists.filter(artist => !existing
      .some(existingArtist => existingArtist.idArtist === artist.idArtist));
    await this.repository.save(_new);
  }
}
