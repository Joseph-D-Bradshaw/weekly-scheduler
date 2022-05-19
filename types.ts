export type WeeklySchedule = Record<string, TimeRow>;

export type TimeRow = Record<string, string>;

export type Day = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type Mode = "oneDay" | "threeDay";

export type SwipeDirection =
  | "SWIPE_UP"
  | "SWIPE_DOWN"
  | "SWIPE_LEFT"
  | "SWIPE_RIGHT";

export interface CellProps {
  text: string;
  height?: number;
  width?: number;
  type?: "top-title" | "content" | "left-title";
}

export interface TableProps {
  weeklyData: WeeklySchedule;
  startDay: Day;
  mode: Mode;
}

export const daysOfWeek: Day[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

export const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
