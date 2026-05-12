import { trainData } from "./linear_regression.ts";
import { type Data } from "./types.ts";

const applyFormula = (x : number):number => 
   1 / (1 + (Math.pow(Math.E, -(x))));


const App = () => {
  // const data: Data = [
  //   { x: 0, finalValue: Math.sin(0) },
  //   { x: Math.PI / 2, finalValue: Math.sin(Math.PI / 2) },
  //   { x: Math.PI / 3, finalValue: Math.sin(Math.PI / 3) },
  //   { x: Math.PI / 4, finalValue: Math.sin(Math.PI / 4) },
  //   { x: Math.PI / 6, finalValue: Math.sin(Math.PI / 6) },
  // ];
  // const model = trainData(data, 2000);
  // console.log({ result: model(0), actualValue : Math.sin(0) });
  // console.log({ result: model(Math.PI / 2) ,actualValue : Math.sin(Math.PI / 2)});
  // console.log({ result: model(Math.PI / 3),actualValue : Math.sin(Math.PI / 3) });
  // console.log({ result: model(Math.PI / 4),actualValue : Math.sin(Math.PI / 4) });
  // console.log({ result: model(Math.PI / 6),actualValue : Math.sin(Math.PI / 6) });


   const data: Data = [
    { x: 0, finalValue: applyFormula(0) },
    { x: 2, finalValue: applyFormula(2) },
    { x: 3, finalValue: applyFormula(3) },
    { x: 4, finalValue: applyFormula(4) },
    { x: 6, finalValue: applyFormula(6) },
  ];
  const model = trainData(data, 2000);
  console.log({ result: model(0), actualValue : applyFormula(0) });
  console.log({ result: model(2) ,actualValue : applyFormula(2)});
  console.log({ result: model(3),actualValue : applyFormula(3) });
  console.log({ result: model(4),actualValue : applyFormula(4) });
  console.log({ result: model(6),actualValue : applyFormula(6) });
};

export default App;
