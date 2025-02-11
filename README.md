# kdag-forum

## Overview
**kdag-forum** is a React-based application designed to facilitate community discussions with dynamic features. It leverages modern libraries and frameworks, including `framer-motion` for animations, `axios` for HTTP requests, and `json-server` for a quick mock backend.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Available Scripts](#available-scripts)

---

## Features
- Interactive UI built with React.
- Routing with `react-router-dom`.
- Styling powered by `styled-components`.
- Smooth animations using `framer-motion`.
- Local backend for development using `json-server`.
- Utility functions for unique ID generation via `uuid`.

---

## Installation

To get started with **kdag-forum**, clone the repository and install the dependencies:

```bash
git clone https://github.com/shashix07/kdag-forum.git
cd kdag-forum
npm install
```

---

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run server`
Starts a local development backend in seperate terminal using `json-server` on [http://localhost:3001](http://localhost:3001).

In case of Failure of `npm run server` or continuous `Module not Found` Error,
Use these 
```bash
npm i -g json-server
npm add json-server
json-server --watch src/data.json --port 3001
---

### Run in seperate Terminal 


## Dependencies

| Package           | Version    | Description                           |
|-------------------|------------|---------------------------------------|
| `axios`           | ^1.7.9     | Promise-based HTTP client            |
| `cra-template`    | 1.2.0      | Create React App template             |
| `framer-motion`   | ^12.4.1    | Animation library for React           |
| `json-server`     | ^1.0.0     | Mock REST API server                  |
| `react`           | ^19.0.0    | Core React library                    |
| `react-dom`       | ^19.0.0    | React rendering to the DOM            |
| `react-icons`     | ^5.4.0     | SVG icons for React                   |
| `react-router-dom`| ^7.1.5     | Routing for React applications        |
| `react-scripts`   | 5.0.1      | React build scripts                   |
| `styled-components`| ^6.1.15   | CSS-in-JS styling library             |
| `uuid`            | ^11.0.5    | Unique ID generator                   |
| `web-vitals`      | ^4.2.4     | Performance metrics for web apps      |

---