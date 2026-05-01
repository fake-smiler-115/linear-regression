import { ActionTypes, type Action, type Data } from "./types.ts";

const applyLinearRegression = (slope: number, x: number, intercept: number) => {
  return slope * x + intercept;
};

const calculateCompleteError = (
  data: Data,
  slope: number,
  intercept: number,
) => {
  const yPred = slope * data.x + intercept;
  return Math.pow(yPred - data.finalValue, 2);
};

const findChangeGradient = (data: Data, slope: number, intercept: number) => {
  const x = data.x;
  const actualValue = data.finalValue;
  const pred = applyLinearRegression(slope, x, intercept);
  const error = pred - actualValue;
  return { slopeGradient: error * x, interceptGradient: error };
};

export const trainData = (
  data: Data,
  epochs: number,
  dispatch: React.ActionDispatch<[action: Action]>,
  learningRate = 0.01,
) => {
  let slope = 0;
  let intercept = 0;
  for (let i = 0; i < epochs; i++) {
    const { slopeGradient, interceptGradient } = findChangeGradient(
      data,
      slope,
      intercept,
    );

    slope -= learningRate * 2 * slopeGradient;
    intercept -= learningRate * 2 * interceptGradient;
    const upadatedSlope = slope;
    const updatedIntercept = intercept;
    setTimeout(
      () => {
        dispatch({ slope : upadatedSlope, intercept : updatedIntercept, type: ActionTypes["updated-values"] });
      },
      i * 100 + 2,
    );

    console.log(
      `Epoch ${i}, MSE: ${calculateCompleteError(data, slope, intercept)}`,
    );
    console.log({ slope, intercept });
  }
};
