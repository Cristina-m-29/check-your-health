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
}
