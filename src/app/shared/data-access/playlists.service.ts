import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { Observable, Subject, distinctUntilChanged, retry, switchMap, tap } from 'rxjs';
import { Response } from '../interfaces/response';
import { Playlist } from '../interfaces/playlist';
import { ResponseError } from '../interfaces/response-error';
import { SinglePlaylist } from '../interfaces/single-playlist';

export interface PlaylistsState {
  playlists: Playlist[];
  loaded: boolean;
  error: string | null;
  selectedPlaylistId: string | null;
  selectedPlaylistData: SinglePlaylist | null
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private http = inject(HttpClient);

  // state
  private state = signal<PlaylistsState>({
    playlists: [],
    loaded: false,
    error: null,
    selectedPlaylistId: null,
    selectedPlaylistData: null
  });

  // selectors
  playlists = computed(() => this.state().playlists);
  selectedPlaylistId = computed(() => this.state().selectedPlaylistId);
  selectedPlaylistData = computed(() => this.state().selectedPlaylistData);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  // sources
  private playlistsLoaded$ = this.getPlaylists().pipe(retry(2));
  selectedPlaylistId$ = new Subject<string>();

  private selectedPlaylist$ = this.selectedPlaylistId$.pipe(
    distinctUntilChanged(),
    switchMap((id) => this.getSinglePlaylist(id))
  )

  constructor() {
    // reducers
    this.playlistsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (playlistsData) => this.state.update((state) => ({
        ...state,
        playlists: playlistsData.items,
        loaded: true
      })),
      error: (error: ResponseError) => this.state.update((state) => ({ ...state, error: error.message }))
    });

    this.selectedPlaylist$.pipe(takeUntilDestroyed()).subscribe((playlist) => this.state.update((state) => ({
      ...state,
      selectedPlaylistId: playlist.id,
      selectedPlaylistData: playlist
    })))
  }

  getPlaylists(): Observable<Response<Playlist>> {
    return this.http.get<Response<Playlist>>(environment.spotifyApiURL + 'me/playlists');
  }

  getSinglePlaylist(playlistId: string): Observable<SinglePlaylist> {
    return this.http.get<SinglePlaylist>(environment.spotifyApiURL + 'playlists/' + playlistId).pipe(tap(console.log));
  }
}
