import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Playlist } from '../../../shared/interfaces/playlist';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [],
  template: `
    <ul class="flex flex-col gap-3 p-3">
      @for (playlist of playlists; track playlist.id) {
        <li role="button" (click)="playlistClick.emit(playlist.id)" class="gap-3 transition-all hover:text-green-300 cursor-pointer" [class.text-green-300]="selectedPlaylistId === playlist.id">{{ playlist.name }}</li>
      } @empty {
        <li class="gap-3">You don't have any playlists</li>
      }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent {
  @Input({ required: true }) playlists!: Playlist[];
  @Input({ required: true }) selectedPlaylistId!: string | null;
  @Output() playlistClick = new EventEmitter<string>();
}
