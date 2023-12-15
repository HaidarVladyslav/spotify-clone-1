import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';
import { ResponseError } from '../interfaces/response-error';

export interface UserState {
  user: User | null,
  error: string | null,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  // state
  private state = signal<UserState>({
    user: null,
    error: null
  });

  // sources
  getCurrentInfo$ = this.getCurrentUserInfo().pipe(retry(2));

  // selectors
  user = computed(() => this.state().user);

  constructor() {
    // reducer
    this.getCurrentInfo$.pipe(takeUntilDestroyed()).subscribe({
      next: (user) => this.state.update((state) => ({ ...state, user })),
      error: (error: ResponseError) => this.state.update((state) => ({ ...state, error: error.message }))
    })
  }

  getCurrentUserInfo(): Observable<User> {
    return this.http.get<User>(environment.spotifyApiURL + 'me');
  }
}
