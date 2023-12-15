import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/data-access/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col h-screen w-full justify-center items-center bg-green-600 gap-5">
      <img class="h-[20vh] object-cover w-max" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify Logo" />
      <button (click)="onLogin()" class="px-6 py-3 border-none rounded-full bg-black text-green-600 font-bold cursor-pointer" type="submit">Connect Spotify</button>
    </section>
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.authService.checkIfTokenIsInStorage() && this.router.navigate(['/']);
  }

  onLogin() {
    this.authService.login();
  }
}
