import {type Data } from "./types.ts";

const calculateCompleteError = (
  data: Data,
  m: number,
  y :number
) => {
  let sumOfSquareError = 0;
  for (let index = 0; index < data.length; index++) {
    const x = data[index].x;
    const yPred = Math.sin((m * x) + y);
    sumOfSquareError += Math.pow(yPred - data[index].finalValue, 2);
  }
  return sumOfSquareError / data.length;
};

const findChangeGradient = (data: Data, m: number, y : number) => {
  let mgradient = 0;
  let bGradient = 0;
  for (let index = 0; index < data.length; index++) {
    const x = data[index].x;
    const linearRegvalue = (m*x)+y;
    const actualValue = data[index].finalValue;
    const pred = Math.sin(linearRegvalue);
    const error = pred - actualValue;
    mgradient += error * Math.cos(linearRegvalue)*x;
    bGradient += error * Math.cos(linearRegvalue);
  }

  return  [(2 / data.length) * mgradient, (2 / data.length) * bGradient];
  
};

export const trainData = (
  data: Data,
  epochs: number,
  learningRate = 0.01,
) => {

  // const predictedValues:predictedValues[] = [];
  let m = 0;
  let y = 0;
  
  for (let i = 0; i < epochs; i++) {
    const [dm,dy] = findChangeGradient(data,m,y);
    m -= learningRate * 2 * dm;
    y -= learningRate * 2 * dy;
    // const mse = calculateCompleteError(data, m,y);
    // console.log(
    //   `Epoch ${i}, MSE: ${mse}`,
    // );
    // console.log({  m,y,zero : Math.sin((m *0) + y),ninety : Math.sin((m * Math.PI/2) + y) });
  }
  // return predictedValues;
  return (x : number) => Math.sin((m * x) + y);
};
