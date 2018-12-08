export interface Lap {
  number: string;
  Timings: Timing[];
}

export interface Timing {
  driverId: string;
  position: string;
  time: string;
}
