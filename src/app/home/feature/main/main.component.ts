import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { SinglePlaylist } from '../../../shared/interfaces/single-playlist';
import { MsToTimePipe } from '../../../shared/pipes/ms-to-time.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe, MsToTimePipe],
  template: `
    <main class="content w-full relative">
      <div class="playlist p-[2rem] flex gap-6">
        <div class="image h-60 shadow-xl shadow-black">
          <img class="object-cover max-h-full" [src]="selectedPlaylist['images'][0].url" [alt]="selectedPlaylist.name">
        </div>
        <div class="details flex flex-col gap-2 text-zinc-50">
          <span class="type">PLAYLIST</span>
          <h1 class="title text-white text-6xl font-bold">{{ selectedPlaylist.name }}</h1>
          <p class="description">{{ selectedPlaylist.description }}</p>
        </div>
      </div>
      <div class="list">
        <div class="header-row grid grid-cols-[0.3fr_3fr_2fr_0.1fr] text-zinc-50 sticky top-[15vh] left-0 px-5 py-2 transition-all" [class.sticky-header]="stickyTableHeaderApplied">
          <div class="col"><span>#</span></div>
          <div class="col"><span>TITLE</span></div>
          <div class="col"><span>ALBUM</span></div>
          <div class="col"><span>
            <fa-icon [icon]="faClock" />
          </span></div>
        </div>
        <div class="tracks mx-4 flex flex-col mb-6">
          @for (track of selectedPlaylist.tracks.items; track track.track.id) {
            <div class="row px-2 py-1 grid grid-cols-[0.3fr_3.1fr_2fr_0.1fr] hover:bg-slate-500 transition-all rounded">
              <div class="col">{{ $index + 1 }}</div>
              <div class="col details flex gap-2">
                <div class="image">
                  <img class="h-[40px]" [src]="track.track.album.images[2].url" [alt]="track.track.name">
                </div>
                <div class="info flex flex-col">
                  <span class="name">{{ track.track.name }}</span>
                  <span class="author">{{ track.track.artists[0].name }}</span>
                </div>
              </div>
              <div class="col">
                <span>{{ track.added_at | date: 'medium' }}</span>
              </div>
              <div class="col">
                <span>{{ track.track.duration_ms | msToTime }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  `,
  styles: `
    .col {
      @apply flex;
      @apply items-center;
      @apply text-zinc-50;
    }
    .sticky-header {
      background-color: rgba(30, 27, 75, 0.95);
      @apply shadow-xl;
      @apply shadow-cyan-500/50;
      border-top: 1px solid;
      @apply border-cyan-500/50;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  faClock = faClock;
  @Input({ required: true }) selectedPlaylist!: SinglePlaylist;
  @Input({ required: true }) stickyTableHeaderApplied: boolean = false;
}
