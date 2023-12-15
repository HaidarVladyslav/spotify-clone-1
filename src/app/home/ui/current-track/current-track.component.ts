import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrentTrack } from '../../../shared/interfaces/current-track';
import { GroupArtistsPipe } from "../../../shared/pipes/group-artists.pipe";

@Component({
    selector: 'app-current-track',
    standalone: true,
    template: `
    <div class="track flex items-center gap-2 h-full ml-3">
      <div class="track-image">
        <img [src]="track.item.album.images[2].url" [alt]="track.item.name">
      </div>
      <div class="track-info flex flex-col gap-1">
        <h4 class="track-name text-white font-bold">{{ track.item.name }}</h4>
        <h6 class="track-artist text-slate-300 text-sm">{{ track.item.artists | groupArtists }}</h6>
      </div>
    </div>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GroupArtistsPipe]
})
export class CurrentTrackComponent {
  @Input({ required: true }) track!: CurrentTrack;
}
