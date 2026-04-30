import { trainData } from "./src/linear_regression.ts";
import { Data } from "./src/types.ts";

const main = () => {
  // const data = [{x : 1,  actualX : 2}, {x : 4,  actualX : 4}, {x : 10,  actualX : 4}];
  const data:Data = [{x : 1,actualX : 2}];
  trainData(data, 100);
};

main();
