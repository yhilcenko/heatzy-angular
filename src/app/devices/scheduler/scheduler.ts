export interface Scheduler {
  did: string;
  updated_at: number;
  attr: {
    time_week: number;
    mode: string;
    lock_switch: number;
    timer_switch: number;
    boost_switch: number;
    time_hour: number;
  };
}
