import type { Data } from "./types.ts";


const applyLinearRegression = (slope: number, x: number, intercept: number) => {
  return slope * x + intercept;
};

function computeMSE(data : Data, slope : number, intercept : number) {
  let error = 0;
  for (let i = 0; i < data.length; i++) {
    const yPred = slope * data[i].x + intercept;
    error += Math.pow(yPred - data[i].actualX, 2);
  }
  return error / data.length;
}

export const trainData = (data: Data, epochs: number, learningRate = 0.01) => {
  let slope = 0;
  let intercept = 0;
  for (let i = 0; i < epochs; i++) {
    let slopeGradient = 0;
    let interceptGradient = 0;

    for (let j = 0; j < data.length; j++) {
      const x = data[j].x;
      const actualValue = data[j].actualX;
      const pred = applyLinearRegression(slope, x, intercept);
      const error = pred - actualValue;
      slopeGradient += error * x;
      interceptGradient += error;
    }

    slopeGradient = (2 / data.length) * slopeGradient;
    interceptGradient = (2 / data.length) * interceptGradient;

    slope -= learningRate * slopeGradient;
    intercept -= learningRate * interceptGradient;

      console.log(`Epoch ${epochs}, MSE: ${computeMSE(data, slope, intercept)}, ${data[0].x}`);
      console.log({slope, intercept});
  }
};
