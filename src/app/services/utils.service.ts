import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public formatDateToUtc(date: Date): moment.Moment {
    return moment(date).utcOffset(0, true).hours(0).minutes(0).seconds(0).milliseconds(0);
  }

  public getTimestampOfDate(date: Date): number {
    return this.formatDateToUtc(date).unix();
  }

  public getEndTimeOfInterval(startTime: number): number {
    let endTime = startTime + 30;
    if (startTime % 100 !== 0) {
      endTime += 40;
    }
    return endTime;
  }

  public formatTimeForInterval(time: number): string {
    const end = time % 100;
    return (time / 100).toFixed().toString() + ':' + (end === 0 ? '00' : end.toString());
  }
}
