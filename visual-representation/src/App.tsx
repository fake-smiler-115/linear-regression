import { DrawRegression } from "./drawGraph.tsx";
import { trainData } from "./linear_regression.ts";
import type { Data } from "./types.ts";

const App = () => {
  const data: Data = { x: 1, finalValue: 2 };
  trainData(data, 100);
  return (
    <div>
      hello world
      <DrawRegression slope={10} intercept={10} x={10} />
    </div>
  );
};

export default App;
