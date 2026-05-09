import { trainData } from "./linear_regression.ts";
import {  type Data} from "./types.ts";

const App = () => {
  const data: Data = [{x : 0, finalValue : 0},{x : Math.PI/2, finalValue : 1}];
  const model = trainData(data, 10000);
  console.log({result : model(0)});
};

export default App;
