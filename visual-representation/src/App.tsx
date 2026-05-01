import { useEffect, useReducer } from "react";
import { DrawRegression } from "./drawGraph.tsx";
import { trainData } from "./linear_regression.ts";
import type { Data } from "./types.ts";
import { reducer } from "./reducer.ts";

const App = () => {
  const correctData = {slope : 10, intercept : 10};
  const data: Data = { x : 1, finalValue:  20};
  const [trainigDetails, dispatch] = useReducer(reducer, {
    slope: 0,
    intercept: 0,
  });

  useEffect(() => trainData(data, 100, dispatch), []);

  return (
    <div>
      <DrawRegression
        slope={trainigDetails.slope}
        intercept={trainigDetails.intercept}
        x={data.x}
        correctData ={correctData}
      />
    </div>
  );
};

export default App;
