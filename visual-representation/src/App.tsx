import { useEffect, useReducer } from "react";
import { DrawRegression } from "./drawGraph.tsx";
import { trainData } from "./linear_regression.ts";
import { ActionTypes, type Data } from "./types.ts";
import { reducer } from "./reducer.ts";

const App = () => {
  // const correctData = {slope : 15, intercept : 6};
  // const data: Data = [{x : 2, finalValue : 36}, {x : 1 , finalValue:21}, {x : 3 ,finalValue:51},{x : -10 ,finalValue:-144},{x : 0 ,finalValue:6}];
  const correctData = {slope : 1, intercept : 1};
  const data: Data = [{x : 1, finalValue : 2}];
  // const correctData = { slope: 100, intercept: 34 };

  // const data: Data = [
  //   { x: 1, finalValue: 134 },
  //   { x: 0, finalValue: 34 },
  //   { x: -1, finalValue: -66 },
  //   { x: 10, finalValue: 1034 },
  // ];
  const [trainigDetails, dispatch] = useReducer(reducer, {
    slope: 0,
    intercept: 0,
    mse: 0,
  });

  useEffect(() => {
    const predictedValues = trainData(data, 100);
    for (let index = 0; index < predictedValues?.length; index++) {
      setTimeout(
        () =>
          dispatch({
            slope: predictedValues[index].slope,
            intercept: predictedValues[index].intercept,
            type: ActionTypes["updated-values"],
            mse: predictedValues[index].mse,
          }),
        100 * index,
      );
    }
  }, []);

  return (
    <div>
      <DrawRegression
        slope={trainigDetails.slope}
        intercept={trainigDetails.intercept}
        x={data[0].x}
        mse={trainigDetails.mse}
        correctData={correctData}
      />
    </div>
  );
};

export default App;
