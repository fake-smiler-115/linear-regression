import { trainData } from "./linear_regression.ts";
import type { Data } from "./types.ts";

const App = () => {
  const data:Data = [{x : 1,actualX : 2}];
  trainData(data, 100);
  return <div>hello world</div>
}

export default App;