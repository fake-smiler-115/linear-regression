import { trainData } from "./linear_regression.ts";
import { type Data } from "./types.ts";

const App = () => {
  const data: Data = [
    { x: 0, finalValue: Math.sin(0) },
    { x: Math.PI / 2, finalValue: Math.sin(Math.PI / 2) },
    { x: Math.PI / 3, finalValue: Math.sin(Math.PI / 3) },
    { x: Math.PI / 4, finalValue: Math.sin(Math.PI / 4) },
  ];
  const model = trainData(data, 2000);
  console.log({ result: model(0), actualValue : Math.sin(0) });
  console.log({ result: model(Math.PI / 2) ,actualValue : Math.sin(Math.PI / 2)});
  console.log({ result: model(Math.PI / 3),actualValue : Math.sin(Math.PI / 3) });
  console.log({ result: model(Math.PI / 4),actualValue : Math.sin(Math.PI / 4) });
};

export default App;
