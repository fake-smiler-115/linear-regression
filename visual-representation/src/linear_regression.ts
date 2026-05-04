import {type Data, type TrainingDetails } from "./types.ts";

const applyLinearRegression = (slope: number, x: number, intercept: number) => {
  return slope * x + intercept;
};

const calculateCompleteError = (
  data: Data,
  slope: number,
  intercept: number,
) => {
  let sumOfSquareError = 0;
  for (let index = 0; index < data.length; index++) {
    const yPred = slope * data[index].x + intercept;
    sumOfSquareError += Math.pow(yPred - data[index].finalValue, 2);
  }
  return sumOfSquareError / data.length;
};

const findChangeGradient = (data: Data, slope: number, intercept: number) => {
  let slopeGradient = 0;
  let interceptGradient = 0;
  for (let index = 0; index < data.length; index++) {
    const x = data[index].x;
    const actualValue = data[index].finalValue;
    const pred = applyLinearRegression(slope, x, intercept);
    const error = pred - actualValue;
    slopeGradient += error * x;
    interceptGradient += error;
  }

  return {
    slopeGradient: (2 / data.length) * slopeGradient,
    interceptGradient: (2 / data.length) * interceptGradient,
  };
};

export const trainData = (
  data: Data,
  epochs: number,
  learningRate = 0.01,
):TrainingDetails[] => {

  const predictedValues:TrainingDetails[] = [];
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
    predictedValues.push({slope, intercept});

    console.log(
      `Epoch ${i}, MSE: ${calculateCompleteError(data, slope, intercept)}`,
    );
    console.log({ slope, intercept });
  }
  return predictedValues;
};
