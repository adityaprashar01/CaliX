export type DemoDay = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  minutes: number;
  completed: boolean;
};

export const demoWeek: DemoDay[] = [
  { day: "Mon", minutes: 5, completed: true },
  { day: "Tue", minutes: 6, completed: true },
  { day: "Wed", minutes: 0, completed: false },
  { day: "Thu", minutes: 5, completed: true },
  { day: "Fri", minutes: 5, completed: true },
  { day: "Sat", minutes: 7, completed: true },
  { day: "Sun", minutes: 5, completed: false },
];

export const demoWeekTotals = {
  totalMinutes: 33,
  activeDays: 5,
};
