# LineGraph Library

A library for creating and manipulating line graphs using the HTML Canvas API.

## Interfaces

### DataPoint

```typescript

interface DataPoint {
  time: number;
  elevation: number;
}
```
Represents a single data point in the graph with time and elevation properties.

### DrawOptions
```typescript
interface DrawOptions {
  color?: string;
  lineWidth?: number;
  fillColor?: string;
  font?: string;
  lineDash?: number[];
  angle?: number; // Angle in degrees for text rotation
}
```
Options for customizing the appearance of lines, circles, and text.

### AxisOptions
```typescript
interface AxisOptions {
  fontSize?: number;
  fontColor?: string;
  font?: string;
  xPadding?: number;
  yPadding?: number;
  xScale?: {
    min: number;
    max: number;
    step: number;
    decimalPlaces?: number;
    showDecimals?: boolean;
    labelOffset?: number;
  };
  yScale?: {
    min: number;
    max: number;
    step: number;
    decimalPlaces?: number;
    showDecimals?: boolean;
    labelOffset?: number;
  };
  xLabel?: string;
  yLabel?: string;
  xAxisStyle?: DrawOptions;
  yAxisStyle?: DrawOptions;
}
```
Options for customizing the appearance of the graph axes.


## LineGraph Class
### Constructor
```typescript
constructor(canvas: HTMLCanvasElement, width: number, height: number)
```
Creates a new instance of LineGraph.

- canvas: The HTMLCanvasElement to draw on.
- width: The width of the canvas.
- height: The height of the canvas.

### clearCanvas
```typescript
setData(data: DataPoint[]): void
```
Clears the entire canvas.

### drawLine
```typescript
drawLine(x1: number, y1: number, x2: number, y2: number, options: DrawOptions = {}): void
```
Draws a line on the canvas.

- x1, y1: The starting coordinates.
- x2, y2: The ending coordinates.
- options: Optional DrawOptions to customize the line.

### drawCircle 
```typescript
drawCircle(x: number, y: number, radius: number, options: DrawOptions = {}): void
```

### drawText
```typescript
drawText(text: string, x: number, y: number, options: DrawOptions = {}): void
```
Draws text on the canvas.

- text: The text string to draw.
- x, y: The coordinates where the text will be placed.
- options: Optional DrawOptions to customize the text.

### drawAxes
```typescript
drawAxes(options: AxisOptions = {}): void
```
Draws the X and Y axes on the canvas.

- options: Optional AxisOptions to customize the axes.

### drawVerticalLinesAtPositions
```typescript
drawVerticalLinesAtPositions(
  xPositions: number[],
  text: string,
  axisOptions: AxisOptions,
  drawOptions: DrawOptions = {},
  textOptions: DrawOptions = {},
  minHeight: number = 0,
  maxHeight: number = this.height
): void
```
Draws vertical lines at specified x-axis positions and places text between them.

- xPositions: An array containing exactly two x-axis positions.
- text: The text to display between the vertical lines.
- axisOptions: The AxisOptions to correctly calibrate the size and placement of the lines.
- drawOptions: Optional DrawOptions to customize the vertical lines.
- textOptions: Optional DrawOptions to customize the text.
- minHeight: Minimum y-coordinate for the vertical lines (default is 0).
- maxHeight: Maximum y-coordinate for the vertical lines (default is canvas height).

### connectDataPoints
```typescript
connectDataPoints(data: DataPoint[], xPadding: number = 50, yPadding: number = 50, options: DrawOptions = {}): void
```
Connects the data points with lines.

- data: An array of DataPoint objects to connect.
- xPadding, yPadding: Padding from the edges of the canvas.
- options: Optional DrawOptions to customize the connecting lines.


## Example Usage 

```typescript 
import { LineGraph, DataPoint, DrawOptions, AxisOptions } from './path-to-your-line-graph-file';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  const width = 800;
  const height = 600;

  const graph = new LineGraph(canvas, width, height);

  const dataPoints: DataPoint[] = [
    { time: 0, elevation: 0 },
    { time: 1, elevation: 10 },
    { time: 2, elevation: 20 },
    { time: 3, elevation: 15 },
    { time: 4, elevation: 25 },
  ];

  graph.setData(dataPoints);

  const axisOptions: AxisOptions = {
    fontSize: 14,
    fontColor: 'black',
    font: 'Arial',
    xPadding: 60,
    yPadding: 60,
    xScale: {
      min: 0,
      max: 5,
      step: 1,
      decimalPlaces: 0,
      showDecimals: false,
      labelOffset: 10,
    },
    yScale: {
      min: 0,
      max: 30,
      step: 5,
      decimalPlaces: 0,
      showDecimals: false,
      labelOffset: 10,
    },
    xLabel: 'Time (s)',
    yLabel: 'Elevation (m)',
    xAxisStyle: { color: 'black', lineWidth: 2 },
    yAxisStyle: { color: 'black', lineWidth: 2 },
  };

  graph.clearCanvas();
  graph.drawAxes(axisOptions);
  graph.plotDataPoints();

  const drawOptions: DrawOptions = {
    color: 'blue',
    lineWidth: 2,
  };

  graph.connectDataPoints(dataPoints, 60, 60, drawOptions);

  const verticalLineOptions: DrawOptions = {
    color: 'red',
    lineWidth: 2,
    lineDash: [5, 5],
  };

  const textOptions: DrawOptions = {
    color: 'black',
    font: '14px Arial',
  };

  const xPositions = [1, 3];
  const text = 'Sample Text';
  const minHeight = 100; // Minimum y-coordinate
  const maxHeight = 500; // Maximum y-coordinate

  graph.drawVerticalLinesAtPositions(xPositions, text, axisOptions, verticalLineOptions, textOptions, minHeight, maxHeight);
});

```
