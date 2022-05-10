export class WorkingHours {
  monday: WorkingHoursInterval = new WorkingHoursInterval();
  thuesday: WorkingHoursInterval = new WorkingHoursInterval();
  wednesday: WorkingHoursInterval = new WorkingHoursInterval();
  thursday: WorkingHoursInterval = new WorkingHoursInterval();
  friday: WorkingHoursInterval = new WorkingHoursInterval();
}

export class WorkingHoursInterval {
  start: number = 0;
  end: number = 0;
}
