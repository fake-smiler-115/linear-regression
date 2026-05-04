import { useEffect, useReducer } from "react";
import { DrawRegression } from "./drawGraph.tsx";
import { trainData } from "./linear_regression.ts";
import { ActionTypes, type Data } from "./types.ts";
import { reducer } from "./reducer.ts";

const App = () => {
  const correctData = {slope : 23, intercept : 0};
  const data: Data = [{x : 2, finalValue : 46}, {x : 1, finalValue : 23}, {x : 10, finalValue : 230}];
  const [trainigDetails, dispatch] = useReducer(reducer, {
    slope: 0,
    intercept: 0,
  });

  useEffect(() =>{
    const predictedValues = trainData(data, 100);
    for(let index = 90; index < predictedValues?.length; index ++) {
      setTimeout(() => dispatch({
          slope: predictedValues[index].slope,
          intercept: predictedValues[index].intercept,
          type: ActionTypes["updated-values"],
        }), 1000 + index);
    }
  } , []);

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
