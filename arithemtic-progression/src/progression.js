const applyArithemticProgression = (diff, x, firstValue) => {
  return firstValue + (x - 1) * diff;
};

const calculateMSE = (data, diff, firstValue) => {
  let sumOfSquareError = 0;

  for (let index = 0; index < data.length; index++) {
    const yPred = applyArithemticProgression(diff, data[index].x, firstValue);
    sumOfSquareError += Math.pow(yPred - data[index].finalValue, 2);
  }

  return sumOfSquareError / data.length;
};

const findChangeGradient = (data, diff, firstValue) => {
  let diffGradient = 0;
  let firstValueGradient = 0;

  for (let index = 0; index < data.length; index++) {
    const x = data[index].x;
    const correctValue = data[index].finalValue;

    const pred = applyArithemticProgression(diff, x, firstValue);
    const error = pred - correctValue;
    diffGradient += error * x;
    firstValueGradient += error;
  }

  return [
    (2 / data.length) * diffGradient,
    (2 / data.length) * firstValueGradient,
  ];
};

export const trainData = (data, epochs, learningRate = 0.01) => {
  // const predictedValues = [];
  let diff = 0;
  let firstValue = 0;

  for (let i = 0; i < epochs; i++) {
    const [dwDiff, dwFirstValue ] = findChangeGradient(data, diff, firstValue);

    diff -= learningRate * 2 * dwDiff;
    firstValue -= learningRate * 2 * dwFirstValue;

    const mse = calculateMSE(data, diff, firstValue);
    // predictedValues.push({diff, firstValue, mse });

    console.log(`Epoch ${i}, MSE: ${mse}`);
    console.log({ diff, firstValue });
  }
  // return predictedValues;

  return (x) => applyArithemticProgression(diff, x, firstValue);
};
