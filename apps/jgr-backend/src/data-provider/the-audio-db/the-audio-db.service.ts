import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { first, Observable, Subject } from 'rxjs';
import { SearchArtistMusicVideos, SearchArtistsResponse } from './the-audio-db.models';

type HttpServiceMethod = 'get' | 'delete' | 'head' | 'post' | 'put' | 'patch' | 'postForm' | 'putForm' | 'patchForm';

type Request<D = any> = {
  method: HttpServiceMethod;
  route: string;
  data?: D;
  config?: AxiosRequestConfig<D>;
};

type HttpServiceMethodCall<T = any, D = any> = (request: Request<D>) => Observable<AxiosResponse<T, D>>;

type QueueItem<T = any, D = any> = {
  request: Request;
  response: Subject<AxiosResponse<T, D>>;
};

/**
 * @see https://www.theaudiodb.com/api_guide.php
 */
@Injectable()
export class TheAudioDBService {
  private readonly API_KEY = process.env.AUDIO_DB_API_KEY ?? '2';
  private readonly API_URL = `https://www.theaudiodb.com/api/v1/json/${this.API_KEY}/`;
  private readonly API_REQUEST_DELAY = 500; // 2 requests por segundo

  private readonly queue: QueueItem[] = [];

  private lastTimeout: ReturnType<typeof setTimeout> | null = null;

  private readonly httpServiceRequests: Record<HttpServiceMethod, HttpServiceMethodCall> = {
    get: request => this.call(request, request.config),
    delete: request => this.call(request, request.config),
    head: request => this.call(request, request.config),
    post: request => this.call(request, request.data, request.config),
    put: request => this.call(request, request.data, request.config),
    patch: request => this.call(request, request.data, request.config),
    postForm: request => this.call(request, request.data, request.config),
    putForm: request => this.call(request, request.data, request.config),
    patchForm: request => this.call(request, request.data, request.config),
  };

  constructor(
    private readonly httpService: HttpService,
  ) { }

  private call<T = any, D = any>({ route, method }: Request<D>, ...args: any[]): Observable<AxiosResponse<T, D>> {
    const url = `${this.API_URL}${route}`;
    return this.httpService[method](url, ...args);
  }

  private processQueue(): void {
    this.lastTimeout = null;

    if (this.queue.length === 0) {
      return;
    }

    this.lastTimeout = setTimeout(
      () => this.processQueue(),
      this.API_REQUEST_DELAY,
    );

    const item = this.queue.shift()!;
    const { request, response } = item;
    const observable = this.httpServiceRequests[request.method](request);

    observable
      .pipe(first())
      .subscribe({
        next: res =>
          response.next(res),
        error: err =>
          response.error(err),
        complete: () =>
          response.complete(),
      });
  }

  private pushRequest<T = any, D = any>(request: Request<D>): Observable<AxiosResponse<T, D>> {
    const response = new Subject<AxiosResponse<T, D>>();

    this.queue.push({ request, response });

    if (this.lastTimeout == null)
      this.processQueue();

    return response.asObservable();
  }

  public searchArtists(artist: string): Observable<AxiosResponse<SearchArtistsResponse>> {
    const request: Request = {
      method: 'get',
      route: `search.php?s=${artist}`,
    };

    return this.pushRequest(request);
  }

  public searchArtistMusicVideos(artistId: string): Observable<AxiosResponse<SearchArtistMusicVideos>> {
    const request: Request = {
      method: 'get',
      route: `mvid.php?i=${artistId}`,
    };

    return this.pushRequest(request);
  }
}
