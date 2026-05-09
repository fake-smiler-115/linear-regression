import { useEffect, useRef } from "react";
import { Colors } from "./types";

type RegressionProps = {
  slope: number;
  intercept: number;
  correctData: {
    slope: number;
    intercept: number;
  };
  mse: number;
  x: number;
};

const mseHistory: number[] = [];

export const DrawRegression = ({
  slope,
  intercept,
  correctData,
  mse,
  x,
}: RegressionProps) => {
  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    mseHistory.push(mse);

    drawRegressionGraph({
      canvas: graphCanvasRef.current,
      slope,
      intercept,
      correctSlope: correctData.slope,
      correctIntercept: correctData.intercept,
      x,
    });

    drawMSEGraph({
      canvas: mseCanvasRef.current,
      mseValues: mseHistory,
    });
  }, [slope, intercept, mse, correctData, x]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
        overflow: "hidden",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "75%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <canvas
            ref={graphCanvasRef}
            width={850}
            height={420}
            style={{
              width: "100%",
              height: "70%",
              border: "2px solid #222",
              borderRadius: "10px",
              background: "#fff",
            }}
          />

          <canvas
            ref={mseCanvasRef}
            width={850}
            height={180}
            style={{
              width: "100%",
              height: "30%",
              border: "2px solid #222",
              borderRadius: "10px",
              background: "#fff",
            }}
          />
        </div>

        <div
          style={{
            width: "25%",
            height: "95%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InfoBox
            slope={slope}
            intercept={intercept}
            correctData={correctData}
            mse={mse}
          />
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({
  slope,
  intercept,
  correctData,
  mse,
}: {
  slope: number;
  intercept: number;
  correctData: {
    slope: number;
    intercept: number;
  };
  mse: number;
}) => {
  const previousMse =
    mseHistory.length > 1
      ? mseHistory[mseHistory.length - 2]
      : undefined;

  const isDecreasing =
    previousMse !== undefined ? mse < previousMse : null;

  return (
    <div
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        background: "#f8f8f8",
        fontFamily: "Arial",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Training Info
      </h2>

      <LineInfo
        title="Correct Line"
        color="blue"
        equation={`y = ${correctData.slope}x + ${correctData.intercept}`}
      />

      <LineInfo
        title="Predicted Line"
        color="red"
        equation={`y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`}
      />

      <MSEInfo mse={mse} isDecreasing={isDecreasing} />
    </div>
  );
};

const LineInfo = ({
  title,
  color,
  equation,
}: {
  title: string;
  color: string;
  equation: string;
}) => {
  return (
    <div
      style={{
        marginBottom: "18px",
        paddingBottom: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <strong
        style={{
          color,
          fontSize: "18px",
        }}
      >
        {title}
      </strong>

      <p
        style={{
          marginTop: "8px",
          fontSize: "16px",
        }}
      >
        {equation}
      </p>
    </div>
  );
};

const MSEInfo = ({
  mse,
  isDecreasing,
}: {
  mse: number;
  isDecreasing: boolean | null;
}) => {
  return (
    <div>
      <strong
        style={{
          fontSize: "18px",
        }}
      >
        MSE Error
      </strong>

      <div
        style={{
          marginTop: "10px",
          padding: "14px",
          borderRadius: "8px",
          background:
            isDecreasing === null
              ? "#ddd"
              : isDecreasing
              ? "#d4edda"
              : "#f8d7da",
          color:
            isDecreasing === null
              ? "#000"
              : isDecreasing
              ? "green"
              : "red",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {mse.toFixed(6)}

        {isDecreasing !== null && (
          <span style={{ marginLeft: "10px" }}>
            {isDecreasing ? "↓ Decreasing" : "↑ Increasing"}
          </span>
        )}
      </div>
    </div>
  );
};

const drawRegressionGraph = ({
  canvas,
  slope,
  intercept,
  correctSlope,
  correctIntercept,
  x,
}: {
  canvas: HTMLCanvasElement | null;
  slope: number;
  intercept: number;
  correctSlope: number;
  correctIntercept: number;
  x: number;
}) => {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  clearCanvas(ctx);

  drawAxis(ctx);

  drawLine(ctx, slope, intercept, x, Colors.red);

  drawLine(
    ctx,
    correctSlope,
    correctIntercept,
    x,
    Colors.blue
  );
};

const drawMSEGraph = ({
  canvas,
  mseValues,
}: {
  canvas: HTMLCanvasElement | null;
  mseValues: number[];
}) => {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  clearCanvas(ctx);

  drawMSEAxis(ctx);

  if (mseValues.length < 2) return;

  const maxMSE = Math.max(...mseValues);
  const minMSE = Math.min(...mseValues);

  const padding = 20;

  ctx.beginPath();

  mseValues.forEach((mse, index) => {
    const x =
      padding +
      (index / (mseValues.length - 1)) *
        (width - padding * 2);

    const normalized =
      (mse - minMSE) / (maxMSE - minMSE || 1);

    const y =
      height -
      padding -
      normalized * (height - padding * 2);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  ctx.stroke();
};

const drawMSEAxis = (
  ctx: CanvasRenderingContext2D
) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.beginPath();

  ctx.moveTo(20, 10);
  ctx.lineTo(20, height - 20);

  ctx.lineTo(width - 10, height - 20);

  ctx.strokeStyle = "#777";
  ctx.lineWidth = 0.8;

  ctx.stroke();
};

const clearCanvas = (
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );
};

const drawAxis = (
  ctx: CanvasRenderingContext2D
) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.beginPath();

  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);

  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);

  ctx.strokeStyle = "#999";
  ctx.lineWidth = 0.8;

  ctx.stroke();
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  m: number,
  b: number,
  maxX: number,
  color: Colors
) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const scaleX = 40;
  const scaleY = 40;

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
  ctx.lineWidth = 1.5;

  ctx.stroke();
};