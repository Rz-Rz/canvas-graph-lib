// The EdgeOptions interface defines optional properties for styling an edge.
export interface EdgeOptions {
    // Optional color of the edge line. Can be any valid CSS color.
    color?: string;
    // Optional width of the edge line. Should be a number representing the line width in pixels.
    lineWidth?: number;
    // A catch-all property to allow for additional optional properties.
    [key: string]: any;
}

// The Edge interface represents an edge in the graph.
export interface Edge {
    // Unique identifier for the edge.
    id: string;
    // The ID of the first node this edge connects.
    nodeId1: string;
    // The ID of the second node this edge connects.
    nodeId2: string;
    // Optional styling options for the edge, using the EdgeOptions interface.
    options?: EdgeOptions;
}
