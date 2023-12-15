import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../interfaces/artist';

@Pipe({
  name: 'groupArtists',
  standalone: true
})
export class GroupArtistsPipe implements PipeTransform {

  transform(value: Artist[]): string {
    return value.map(v => v.name).join(', ');
  }
}
