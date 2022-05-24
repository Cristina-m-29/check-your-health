import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    return this.getStartOfNumber(value) + ':' + this.getEndOfNumber(value);
  }

  private getStartOfNumber(nr: number): string {
    return (nr / 100).toFixed().toString();
  }

  private getEndOfNumber(nr: number): string {
    const end = nr % 100;
    console.log(end, typeof end);
    return end === 0 ? '00' : end.toString();
  }

}
