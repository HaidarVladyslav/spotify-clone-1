import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div class="search-bar bg-white w-1/3 flex gap-2 rounded-2xl px-4 py-2">
      <fa-icon [icon]="faSearch" />
      <input placeholder="Artists, songs, or podcasts" class="w-full border-none outline-none" />
    </div>
    <div class="avatar bg-black py-3 px-6 rounded-xl flex justify-center items-center text-white hover:bg-teal-500 hover:text-black transition-all cursor-pointer">
      <a class="flex justify-center items-center gap-3 decoration-0 font-bold">
        <fa-icon class="text-xl flex" [icon]="faCircleUser" />
        <span>{{ user?.display_name }}</span>
      </a>
    </div>
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      height: 15vh;
      z-index: 1;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      &.scrolled {
        background-color: rgba(30, 27, 75, 0.75);
        @apply shadow-xl;
        @apply shadow-cyan-500/50;

        &-no-shadow {
          box-shadow: none;  
        }
      }
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input({ required: true }) user!: User | null;
  faSearch = faSearch;
  faCircleUser = faCircleUser;
}
