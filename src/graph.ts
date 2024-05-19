import { Node, NodeOptions } from "./models/node.model";
import { Edge, EdgeOptions } from "./models/edge.model";

interface DataPoint {
  time: number;
  elevation: number;
}

interface DrawOptions {
  color?: string;
  lineWidth?: number;
  fillColor?: string;
  font?: string;
}

class LineGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private data: DataPoint[] = [];
  private width: number;
  private height: number;

  constructor(canvasId: string, width: number, height: number) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options: DrawOptions = {},
  ): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    if (options.color) this.ctx.strokeStyle = options.color;
    if (options.lineWidth) this.ctx.lineWidth = options.lineWidth;
    this.ctx.stroke();
  }

  drawCircle(
    x: number,
    y: number,
    radius: number,
    options: DrawOptions = {},
  ): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (options.fillColor) {
      this.ctx.fillStyle = options.fillColor;
      this.ctx.fill();
    }
    if (options.color) {
      this.ctx.strokeStyle = options.color;
      this.ctx.stroke();
    }
  }

  drawText(
    text: string,
    x: number,
    y: number,
    options: DrawOptions = {},
  ): void {
    if (options.font) this.ctx.font = options.font;
    if (options.color) this.ctx.fillStyle = options.color;
    this.ctx.fillText(text, x, y);
  }

  drawAxes(): void {
    const padding = 50;
    const times = this.data.map((d) => d.time);
    const elevations = this.data.map((d) => d.elevation);

    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    const maxElevation = Math.max(...elevations);
    const minElevation = Math.min(...elevations);

    const timeInterval = (maxTime - minTime) / 10;
    const elevationInterval = (maxElevation - minElevation) / 10;

    // Draw X-axis
    this.drawLine(
      padding,
      this.height - padding,
      this.width - padding,
      this.height - padding,
    );
    this.drawText("Time", this.width / 2, this.height - 20, {
      color: "black",
      font: "16px Arial",
    });

    // Draw X-axis labels
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * (this.width - 2 * padding)) / 10;
      const time = minTime + i * timeInterval;
      this.drawText(time.toFixed(2), x, this.height - padding + 20, {
        color: "black",
        font: "12px Arial",
      });
    }

    // Draw Y-axis
    this.drawLine(padding, padding, padding, this.height - padding);
    this.drawText("Elevation", 20, this.height / 2, {
      color: "black",
      font: "16px Arial",
    });

    // Draw Y-axis labels
    for (let i = 0; i <= 10; i++) {
      const y = this.height - padding - (i * (this.height - 2 * padding)) / 10;
      const elevation = minElevation + i * elevationInterval;
      this.drawText(elevation.toFixed(2), padding - 40, y + 5, {
        color: "black",
        font: "12px Arial",
      });
    }
  }

  plotDataPoints(): void {
    const padding = 50;
    const times = this.data.map((d) => d.time);
    const elevations = this.data.map((d) => d.elevation);

    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    const maxElevation = Math.max(...elevations);
    const minElevation = Math.min(...elevations);

    this.data.forEach((dataPoint) => {
      const x =
        padding +
        ((dataPoint.time - minTime) / (maxTime - minTime)) *
        (this.width - 2 * padding);
      const y =
        this.height -
        padding -
        ((dataPoint.elevation - minElevation) / (maxElevation - minElevation)) *
        (this.height - 2 * padding);
      this.drawCircle(x, y, 5, { fillColor: "blue" });
    });
  }

  connectDataPoints(): void {
    const padding = 50;
    const times = this.data.map((d) => d.time);
    const elevations = this.data.map((d) => d.elevation);

    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    const maxElevation = Math.max(...elevations);
    const minElevation = Math.min(...elevations);

    this.ctx.beginPath();
    this.data.forEach((dataPoint, index) => {
      const x =
        padding +
        ((dataPoint.time - minTime) / (maxTime - minTime)) *
        (this.width - 2 * padding);
      const y =
        this.height -
        padding -
        ((dataPoint.elevation - minElevation) / (maxElevation - minElevation)) *
        (this.height - 2 * padding);
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    this.ctx.stroke();
  }

}

export { LineGraph, DataPoint };
