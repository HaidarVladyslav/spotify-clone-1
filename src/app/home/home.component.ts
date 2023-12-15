import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, NgZone, OnInit, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { fromEvent, tap } from 'rxjs';
import { SidebarComponent } from '../shared/ui/sidebar/sidebar.component';
import { FooterComponent } from "../shared/ui/footer/footer.component";
import { AuthService } from '../shared/data-access/auth.service';
import { NavbarComponent } from "../shared/ui/navbar/navbar.component";
import { PlaylistsComponent } from "./ui/playlists/playlists.component";
import { PlaylistsService } from '../shared/data-access/playlists.service';
import { UserService } from '../shared/data-access/user.service';
import { MainComponent } from "./feature/main/main.component";
import { CurrentTrackComponent } from "./ui/current-track/current-track.component";
import { CurrentTrackService } from './data-access/current-track.service';
import { PlayerControlsComponent } from "./ui/player-controls/player-controls.component";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
      <div class="top grid grid-cols-[12%_88%] bg-gradient-to-b from-transparent to-black bg-teal-800">
        <app-sidebar class="h-[85vh] overflow-auto">
          <app-playlists class="overflow-auto" [playlists]="playlistsService.playlists()" [selectedPlaylistId]="playlistsService.selectedPlaylistId()" (playlistClick)="playlistsService.selectedPlaylistId$.next($event)" />
        </app-sidebar>
        <div #scrollContainer class="right overflow-auto relative">
          <app-navbar [class.scrolled]="isScrollTopMoreThan50()" [class.scrolled-no-shadow]="isScrollTopMoreThan50() && isScrollTopMoreThan288()" [user]="userService.user()" />
          @if(playlistsService.selectedPlaylistData(); as playlist) {
            <app-main [selectedPlaylist]="playlist" [stickyTableHeaderApplied]="isScrollTopMoreThan288()" />
          } @else {
           <span>Choose Playlist</span>
          }
        </div>
      </div>
      <app-footer>
        @if(currentTrackService.currentTrack(); as track) {
          <app-current-track [track]="track" />
          <app-player-controls [isPlaying]="true" (forwardStep)="currentTrackService.skipTrack$.next('next')" (backwardStep)="currentTrackService.skipTrack$.next('previous')" />
        } @else {
          <span class="col-span-full flex justify-center items-center">No Track Playing</span>
        }
      </app-footer>
  `,
  styles: `
    :host {
      display: grid;
      max-width: 100vw;
      max-height: 100vh;
      overflow: hidden;
      grid-template-rows: 85vh 15vh;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-thumb {
      @apply bg-teal-400;
      border-radius: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, FooterComponent, NavbarComponent, PlaylistsComponent, MainComponent, CurrentTrackComponent, PlayerControlsComponent]
})
export default class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: true, read: ElementRef }) scrollContainer!: ElementRef<HTMLDivElement>
  private authService = inject(AuthService);
  public playlistsService = inject(PlaylistsService);
  public userService = inject(UserService);
  public currentTrackService = inject(CurrentTrackService);

  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  public isScrollTopMoreThan50 = signal<boolean>(false);
  public isScrollTopMoreThan288 = signal<boolean>(false);

  constructor() {
    this.authService.getTokenFromUrl();
    !this.authService.checkIfTokenIsInStorage() && this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.scrollContainer.nativeElement, 'scroll')
        .pipe(
          tap((event) => {
            const v50 = (event.target as HTMLDivElement).scrollTop >= 50;
            const v288 = (event.target as HTMLDivElement).scrollTop >= 288;
            if (v50 !== this.isScrollTopMoreThan50()) {
              this.isScrollTopMoreThan50.set(v50);
              this.cdr.detectChanges();
            }
            if (v288 !== this.isScrollTopMoreThan288()) {
              this.isScrollTopMoreThan288.set(v288);
              this.cdr.detectChanges();
            }
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    })
  }
}
