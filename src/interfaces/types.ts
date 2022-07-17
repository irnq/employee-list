export interface IPerson {
  name: string;
  lastName: string;
  middleName: string;
  position: string;
  certificate: boolean;
  salary: number;
  workFrom: string;
  rate: Rate;
  id: string;
}

export enum Rate {
  half = 0.5,
  full = 1,
}
