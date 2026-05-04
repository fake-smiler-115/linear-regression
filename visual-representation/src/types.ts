export type Data = { x: number; finalValue: number }[];

export enum ActionTypes {
  "updated-values",
}

export type Action = { slope: number; intercept: number; type: ActionTypes };

export type TrainingDetails = { slope: number; intercept: number };

export type predictedValues = { slope: number; intercept: number, mse : number };

export  enum Colors {
  'red' = 'red',
  'green' = 'green',
  'blue' = 'blue',
}
