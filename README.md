# Dijkstra's Algorithm Visualizer

A interactive web application that visualizes Dijkstra's pathfinding algorithm in real-time. Built with Next.js, TypeScript, and TailwindCSS.

## Project Deployment

The project is live! You can view it here: [https://algoviz-three.vercel.app/](https://algoviz-three.vercel.app/)

## Features

### 🎯 Interactive Graph Creation

- Add nodes with a single click
- Create weighted edges between nodes
- Drag nodes to reposition them
- Remove nodes and edges easily

### 🔍 Pathfinding Visualization

- Set start and end nodes
- Add via nodes for complex paths
- Watch the algorithm work step by step
- View the shortest path highlighted

### 🎮 Animation Controls

- Play/Pause animation
- Step forward/backward
- Progress bar showing current step
- Clear visual feedback of visited nodes

### 💡 Features

- Real-time status updates
- Clear node type indicators
- Weighted edge support
- Interactive controls
- Visual step tracking

## How It Works

### Dijkstra's Algorithm

The visualizer implements Dijkstra's algorithm to find the shortest path between nodes in a graph. The algorithm works by:

1. Starting from the source node
2. Calculating distances to neighboring nodes
3. Visiting the unvisited node with smallest distance
4. Updating distances to neighbors
5. Repeating until reaching the target node

### Node Types

- 🟢 Start Node: Beginning of the path
- 🔴 End Node: Destination
- 🟣 Via Node: Required intermediate stops
- 🟡 Path Node: Part of the shortest path
- ⚪ Regular Node: Standard graph node

## Technical Implementation

### Built With

- Next.js 14
- TypeScript
- TailwindCSS
- React Context for state management

### Key Components

- Graph visualization with SVG
- Drag and drop functionality
- Animation system
- Path calculation
- Interactive controls
