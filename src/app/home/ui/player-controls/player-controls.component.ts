import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faPause, faShuffle, faForwardStep, faBackwardStep, faRepeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <button (click)="shuffle.emit()" class="p-2 border-white rounded-full hover:bg-slate-100 hover:text-black transition-all w-10 h-10"><fa-icon [icon]="faShuffle" /></button>
    <button (click)="backwardStep.emit()" class="p-2 border-white rounded-full hover:bg-slate-100 hover:text-black transition-all w-10 h-10"><fa-icon [icon]="faBackwardStep" /></button>
    <button (click)="playPause.emit()" class="p-2 border-white rounded-full bg-slate-200 text-black hover:bg-teal-700 hover:text-slate-50 transition-all w-10 h-10">
      @if(!isPlaying) {
        <fa-icon [icon]="faPlay" />
      } @else {
        <fa-icon [icon]="faPause" />
      }
    </button>
    <button (click)="forwardStep.emit()" class="p-2 border-white rounded-full hover:bg-slate-100 hover:text-black transition-all w-10 h-10"><fa-icon [icon]="faForwardStep" /></button>
    <button (click)="repeat.emit()" class="p-2 border-white rounded-full hover:bg-slate-100 hover:text-black transition-all w-10 h-10"><fa-icon [icon]="faRepeat" /></button>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerControlsComponent {
  @Input({ required: true }) isPlaying: boolean = false;
  @Output() playPause = new EventEmitter<void>();
  @Output() repeat = new EventEmitter<void>();
  @Output() backwardStep = new EventEmitter<void>();
  @Output() forwardStep = new EventEmitter<void>();
  @Output() shuffle = new EventEmitter<void>();
  faPlay = faPlay;
  faPause = faPause;
  faShuffle = faShuffle;
  faForwardStep = faForwardStep;
  faBackwardStep = faBackwardStep;
  faRepeat = faRepeat;
}
