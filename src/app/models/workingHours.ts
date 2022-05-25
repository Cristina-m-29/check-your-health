export class WorkingHours {
  monday: HoursInterval = new HoursInterval();
  tuesday: HoursInterval = new HoursInterval();
  wednesday: HoursInterval = new HoursInterval();
  thursday: HoursInterval = new HoursInterval();
  friday: HoursInterval = new HoursInterval();
}

export class HoursInterval {
  start: number = 0;
  end: number = 0;
}

export const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];