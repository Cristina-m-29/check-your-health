export class WorkingHours {
  monday: HoursInterval = new HoursInterval();
  thuesday: HoursInterval = new HoursInterval();
  wednesday: HoursInterval = new HoursInterval();
  thursday: HoursInterval = new HoursInterval();
  friday: HoursInterval = new HoursInterval();
}

export class HoursInterval {
  start: number = 0;
  end: number = 0;
}
