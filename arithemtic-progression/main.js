import { trainData } from "./src/progression.js";


const main = () => {
  const correctData = { firstValue: 9, diff: 5 };
  const data = [
    { x: 2, finalValue:  14},
    { x: 3, finalValue: 19 },
    { x: 10, finalValue: 54 },
  ];

  const model = trainData(data, 1000);

  while((true)) {
    const n = prompt('enter the n');
    console.log(model(n));     
  }
}

main()