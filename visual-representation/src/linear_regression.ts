import type { Data } from "./types.ts";

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

export const trainData = (data: Data, epochs: number, learningRate = 0.01) => {

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

    console.log(
      `Epoch ${i}, MSE: ${calculateCompleteError(data, slope, intercept)}, ${data.x}`,
    );
    console.log({ slope, intercept });
  }
};
