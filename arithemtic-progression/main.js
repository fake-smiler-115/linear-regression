import { trainData } from "./src/progression.js";


const main = () => {
  const correctData = { firstValue: 9, diff: 5 };
  const data = [
    { x: 2, finalValue:  14},
    { x: 3, finalValue: 19 },
    { x: 10, finalValue: 54 },
  ];

  trainData(data, 300);
}

main()