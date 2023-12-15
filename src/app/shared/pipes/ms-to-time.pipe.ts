import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToTime',
  standalone: true
})
export class MsToTimePipe implements PipeTransform {
  transform(value: number): string {
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }

    function convertMsToTime(milliseconds: number) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds = seconds % 60;
      minutes = minutes % 60;

      hours = hours % 24;
      let returnValue = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      if (hours) {
        returnValue = `${padTo2Digits(hours)}:` + returnValue;
      }
      return returnValue;
    }
    return convertMsToTime(value);
  }
}
