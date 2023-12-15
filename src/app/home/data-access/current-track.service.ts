import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentTrack } from '../../shared/interfaces/current-track';
import { SkipTrackType } from './models/skip-track-type';

export interface CurrentTrackState {
  currentTrack: CurrentTrack | null;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentTrackService {
  private http = inject(HttpClient);

  // state
  state = signal<CurrentTrackState>({
    currentTrack: null
  });

  // selectors
  currentTrack = computed(() => this.state().currentTrack);

  // sources
  getCurrentTrack$ = this.getCurrentPlayingTrack().pipe(retry(2));
  skipTrack$ = new Subject<SkipTrackType>();

  constructor() {
    // reducers
    this.getCurrentTrack$.pipe(takeUntilDestroyed())
      .subscribe(currentTrack => this.state.update((state) => ({
        ...state,
        currentTrack
      })));

    // it requires Spotify Premium
    // this.skipTrack$.pipe(
    //   switchMap((skipTrackType) => this.changeTrack(skipTrackType)),
    //   takeUntilDestroyed()
    // ).subscribe(console.log)
  }

  private getCurrentPlayingTrack(): Observable<CurrentTrack> {
    return this.http.get<CurrentTrack>(environment.spotifyApiURL + 'me/player/currently-playing');
  }

  private changeTrack(skipTrackType: SkipTrackType) {
    return this.http.post<CurrentTrack>(environment.spotifyApiURL + 'me/player/' + skipTrackType, {});
  }
}
