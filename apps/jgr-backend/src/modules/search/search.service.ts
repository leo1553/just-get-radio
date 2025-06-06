import { Injectable } from '@nestjs/common';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { ArtistDataService, ArtistEntity } from 'src/data-provider/db/entities/artist';
import { MusicVideoDataService, MusicVideoEntity } from 'src/data-provider/db/entities/music-video';
import { PlaylistDataService } from 'src/data-provider/db/entities/playlist';
import { TheAudioDBService } from 'src/data-provider/the-audio-db';
import { ArtistSongs, PlaylistSongs, Song } from 'src/models/song.models';
import { SearchResponse } from './search.models';

@Injectable()
export class SearchService {
  constructor(
    private readonly artistDataService: ArtistDataService,
    private readonly musicVideoDataService: MusicVideoDataService,
    private readonly theAudioDbService: TheAudioDBService,
    private readonly playlistDataService: PlaylistDataService,
  ) { }

  private searchArtists(query: string): Observable<ArtistEntity[]> {
    return this.artistDataService.findByName(query).pipe(
      switchMap(artists => artists.length > 0
        ? of(artists)
        : this.theAudioDbService.searchArtists(query)
          .pipe(
            map(response => typeof response.data === 'object' && response.data.artists.length > 0
              ? response.data
              : { artists: [] }
            ),
            map(response => response.artists.map<ArtistEntity>(artist => ({
              idArtist: artist.idArtist,
              strArtist: artist.strArtist,
            }))),
            tap(async artists => {
              if (artists.length === 0)
                return;

              await this.artistDataService.insertMany(artists);
            }),
          ),
      )
    );
  }

  private searchArtistMusicVideos(artistId: string): Observable<MusicVideoEntity[]> {
    return this.musicVideoDataService.findByArtist(artistId).pipe(
      switchMap(musicVideos => musicVideos.length > 0
        ? of(musicVideos)
        : this.theAudioDbService.searchArtistMusicVideos(artistId)
          .pipe(
            map(response => typeof response.data === 'object' && response.data.mvids.length > 0
              ? response.data
              : { mvids: [] }
            ),
            map(response => response.mvids.map<MusicVideoEntity>(mvid => ({
              idTrack: mvid.idTrack,
              idAlbum: mvid.idAlbum,
              idArtist: artistId,
              strTrack: mvid.strTrack,
              strArtist: mvid.strArtist,
              intDuration: mvid.intDuration,
              strTrackThumb: mvid.strTrackThumb,
              strMusicVid: mvid.strMusicVid,
            }))),
            tap(async mvids => {
              if (mvids.length === 0)
                return;

              await this.musicVideoDataService.insertMany(mvids);
            }),
          ),
      )
    );
  }

  private searchArtistSongs(query: string): Observable<ArtistSongs | null> {
    return this.searchArtists(query).pipe(
      switchMap(artists => {
        if (artists.length === 0)
          return of<ArtistSongs>(null);

        const artist = artists[0];

        return this.searchArtistMusicVideos(artist.idArtist).pipe(
          map(musicVideos => ({
            id: artist.idArtist,
            name: artist.strArtist,
            songs: musicVideos.map<Song>(mvid => this.musicVideoDataService.mapToSong(mvid))
              .sort((a, b) => a.title.localeCompare(b.title)),
          })),
        );
      }),
    );
  }

  private searchSongs(query: string): Observable<Song[]> {
    return this.musicVideoDataService.findByName(query).pipe(
      map(mvids => mvids.length > 0
        ? mvids.map(mvid => this.musicVideoDataService.mapToSong(mvid))
          .sort((a, b) => a.title.localeCompare(b.title))
        : []
      ),
    );
  }

  private searchPlaylistSongs(query: string): Observable<PlaylistSongs[]> {
    return this.playlistDataService.findByName(query).pipe(
      map(playlists => playlists
        .filter(playlist => playlist.songs.length > 0)
        .map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          songs: playlist.songs.map<Song>(song => this.musicVideoDataService.mapToSong(song))
            .sort((a, b) => a.title.localeCompare(b.title)),
        }))),
    );
  }

  public search(query: string): Observable<SearchResponse> {
    return forkJoin([
      this.searchArtistSongs(query),
      this.searchSongs(query),
      this.searchPlaylistSongs(query),
    ]).pipe(
      map(([artist, songs, playlists]) => ({
        artist,
        playlists,
        songs,
      })),
    );
  }
}

