export interface Schedule {
    id? : number
    data: Date
    startTime: Date;
    endTime: Date;
    status : string;
    max: number;
    count: number;
  }