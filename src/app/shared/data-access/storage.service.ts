import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/local-storage';
import { SET_TOKEN } from '../utils/constants/set-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);
  
  setToken(token: string) {
    this.storage.setItem(SET_TOKEN, token);
  }

  getToken(): string | null {
    return this.storage.getItem(SET_TOKEN);
  }

  removeToken() {
    this.storage.removeItem(SET_TOKEN);
  }
}
