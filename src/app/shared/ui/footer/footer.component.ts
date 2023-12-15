import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="border-t border-white h-full grid grid-cols-[1fr_2fr_1fr] gap-3"><ng-content /></footer>
  `,
  styles: `
    :host {
      @apply bg-zinc-950;
      @apply text-white;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { }
