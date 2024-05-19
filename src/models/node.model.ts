// The NodeOptions interface defines optional properties for styling a node.
export interface NodeOptions {
    // Optional radius of the node's circle. If not provided, a default value should be used.
    radius?: number;
    // Optional fill color of the node's circle. Can be any valid CSS color.
    fillColor?: string;
    // Optional border color of the node's circle. Can be any valid CSS color.
    borderColor?: string;
    // A catch-all property to allow for additional optional properties.
    [key: string]: any;
}

// The Node interface represents a node in the graph.
export interface Node {
    // Unique identifier for the node.
    id: string;
    // The x-coordinate of the node's position on the canvas.
    x: number;
    // The y-coordinate of the node's position on the canvas.
    y: number;
    // The label for the node, which can be used to display text near the node.
    label: string;
    // Optional styling options for the node, using the NodeOptions interface.
    options?: NodeOptions;
}
