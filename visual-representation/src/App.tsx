import { useEffect, useReducer } from "react";
import { DrawRegression } from "./drawGraph.tsx";
import { trainData } from "./linear_regression.ts";
import type { Data } from "./types.ts";
import { reducer } from "./reducer.ts";

const App = () => {
  const data: Data = { x: 10, finalValue: 200 };
  const [trainigDetails, dispatch] = useReducer(reducer, {
    slope: 0,
    intercept: 0,
  });

  useEffect(() => trainData(data, 100, dispatch), []);

  return (
    <div>
      hello world
      <DrawRegression
        slope={trainigDetails.slope}
        intercept={trainigDetails.intercept}
        x={10}
      />
    </div>
  );
};

export default App;
