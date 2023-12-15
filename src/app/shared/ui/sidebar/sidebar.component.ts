import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <nav class="max-h-full flex flex-col gap-6 pt-4">
      <div>
        <img class="h-12 object-cover w-max mx-auto" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="Spotify Logo" />
      </div>
      <ul class="links flex flex-col gap-3 mt-3 p-3">
        <li><a class="flex items-center gap-3 transition-all hover:text-green-300 cursor-pointer"><fa-icon [icon]="faHome" />Home</a></li>
        <li><a class="flex items-center gap-3 transition-all hover:text-green-300 cursor-pointer"><fa-icon [icon]="faSearch" />Search</a></li>
        <li><a class="flex items-center gap-3 transition-all hover:text-green-300 cursor-pointer"><fa-icon [icon]="faBookmark" />Your Library</a></li>
      </ul>
      <ng-content />
    </nav>
  `,
  styles: `
    :host {
      @apply bg-black;
      @apply text-white;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  faHome = faHome;
  faSearch = faSearch;
  faBookmark = faBookmark;
}
