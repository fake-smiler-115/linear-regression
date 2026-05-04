import { useEffect, useRef } from "react";
import { Colors } from "./types";

export const DrawRegression = ({
  slope,
  intercept,
  x,
  correctData
}: {
  slope: number;
  intercept: number;
  x: number;
  correctData : {slope : number, intercept : number},
}) => {
  const canvasRef = useRef(null);
  const canvasElemetn = <canvas ref={canvasRef} width={600} height={400} />;
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    drawGraph(ctx, slope, intercept, x, Colors.red);
    drawGraph(ctx, correctData.slope, correctData.intercept, x, Colors.blue); 
  }, [slope, intercept, x]);
  return canvasElemetn;
};

const drawGraph = (ctx : CanvasRenderingContext2D, m : number, b : number, maxX : number,color : Colors)  : void => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // ctx.clearRect(0, 0, width, height);

  const scaleX = 40;
  const scaleY = 40;

  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  ctx.beginPath();
  for (let x = -maxX; x <= maxX; x += 0.1) {
    const y = m * x + b;

    const canvasX = width / 2 + x * scaleX;
    const canvasY = height / 2 - y * scaleY;

    if (x === -maxX) {
      ctx.moveTo(canvasX, canvasY);
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  }

  ctx.strokeStyle = color;
  ctx.stroke();
};
