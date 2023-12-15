import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ID } from './constants/client-id.constant';
import { WINDOW } from '../tokens/window';
import { StorageService } from './storage.service';

const redirectURL = 'http://localhost:4200/';
const apiURL = 'https://accounts.spotify.com/authorize?';
const scopes = ['user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played'
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage = inject(StorageService);
  private router = inject(Router);
  private WINDOW = inject(WINDOW);

  login() {
    this.WINDOW.location.href = `${apiURL}client_id=${CLIENT_ID}&redirect_uri=${redirectURL}&scope=${scopes.join(' ')}&response_type=token&shoa_dialog=true`;
  }

  getTokenFromUrl() {
    const hash = this.WINDOW.location.hash;
    if (hash) {
      const token = hash.substring(1).split('&')[0].split('=')[1];
      this.setToken(token);
      this.redirectByTokenValue(token);
    }
  }

  setToken(token: string) {
    this.storage.setToken(token);
  }

  redirectByTokenValue(token: string) {
    if (token) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/auth/login']);
      this.storage.removeToken();
    }
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }

  checkIfTokenIsInStorage() {
    return this.storage.getToken();
  }
}
