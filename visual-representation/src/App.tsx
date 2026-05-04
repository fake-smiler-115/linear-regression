import { useEffect, useReducer } from "react";
import { DrawRegression } from "./drawGraph.tsx";
import { trainData } from "./linear_regression.ts";
import type { Data } from "./types.ts";
import { reducer } from "./reducer.ts";

const App = () => {
  const correctData = {slope : 50, intercept : 50};
  const data: Data = [{x : 2, finalValue : 150}, {x : 1, finalValue : 100}];
  const [trainigDetails, dispatch] = useReducer(reducer, {
    slope: 0,
    intercept: 0,
  });

  useEffect(() => trainData(data, 1000, dispatch), []);

  return (
    <div>
      <DrawRegression
        slope={trainigDetails.slope}
        intercept={trainigDetails.intercept}
        x={data[0].x}
        correctData ={correctData}
      />
    </div>
  );
};

export default App;
