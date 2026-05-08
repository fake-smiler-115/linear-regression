import { ActionTypes, type Action, type TrainingDetails } from "./types";

export const reducer = (_data: TrainingDetails, action: Action) => {
  switch (action.type) {
    case ActionTypes["updated-values"]: {
      
      return { slope: action.slope, intercept: action.intercept, mse:action.mse };
    }
  }
};
