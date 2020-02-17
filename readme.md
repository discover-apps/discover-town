# React Typescript
This project implements React w/ Typescript that is served by a Node.js Express application.

### Features
* Express API
* Webpack bundling
* Hot Reloading
* Typescript
* Sass components
* Local image support
* Environment Variables
* React Testing with Jest
* Express Testing with Jest
* Docker configuration
* and more!

### Coming soon (my excuses for not adding to project)
* React router (substantial bundle size increase)
* MongoDB Database
* MongoDB Testing with Jest
* Passport.js | OAuth Authentication

### Needs Fixing
* Docker should use PM2 instead of Nodemon for Production Environment

## Step 1: Install & Setup Webpack

### Create package.json
```
$ npm init -y
```

### Install Dependencies
```shell script
$ npm install -D webpack @types/webpack webpack-dev-middleware @types/webpack-dev-middleware webpack-hot-middleware @types/webpack-hot-middleware ts-loader html-webpack-plugin
```

### Add Webpack Config File
##### ~/webpack.config.js.backup
```javascript
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: [
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
            "./src/react/index.tsx"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
        modules: [path.resolve('./node_modules'), path.resolve('./src')]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            },
        ]
    }
};
```

## Step 2: Create React Application

### Install Dependencies
```shell script
$ npm install -D react @types/react react-dom @types/react-dom react-hot-loader @hot-loader/react-dom
```

### Create Files and Directories

##### ~/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/"/>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <title>React Typescript</title>
</head>
<body>
<div id="root"></div>
</body>
</html>

```

##### Create directories for our React tsx files
```shell script
$ mkdir src/react && mkdir src/react/components
```

##### ~/src/react/index.tsx
```typescript jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/app';

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <App/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if ((module as any).hot) {
    (module as any).hot.accept('./components/app', render);
}
```

##### ~/src/react/components/app.tsx
```typescript jsx
import {hot} from 'react-hot-loader/root';
import React from 'react';

const App = () => {
    return (
        <div className="app_container">
            <div className="app_inner">
                <h1>Welcome to React-Typescript!</h1>
            </div>
        </div>
    )
};

export default hot(App);
```

## Step 3: Create Express Application

### Install Dependencies
```shell script
$ npm install -D typescript ts-node express @types/express
```

### Create files and directories
Run the following command in root of project
```shell script
$ mkdir src && mkdir src/server
```

##### ~/src/server/index.ts
```typescript
import express, {Request, Response} from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const webpackConfig = require('./../../webpack.config.js');

const compiler = webpack(webpackConfig);

const app = express();

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: "errors-warnings"
    })
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static("dist"));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../dist/index.html"))
});

app.listen(3000, () => {
    console.log("Express started on http://localhost:3000/");
});
```

In our project root add a tsconfig file:

##### ~/tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react",
    "target": "es6",
    "outDir": "dist",
    "rootDir": "./src",
    "module": "commonjs",
    "baseUrl": "./src/react",
    "moduleResolution": "node",
    "sourceMap": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "typeRoots": [
      "./node_modules/@types/"
    ]
  },
  "exclude": [
    "dist",
    "node_modules",
    "**/*.spec.ts"
  ]
}
```
---
# Optional Addons

## Step 4: Add SCSS

### Install Dependencies
```shell script
$ npm install -D sass-loader node-sass css-loader style-loader
```

### Add Webpack Loader

##### ~/webpack.config.js.backup
```javascript
module.exports = {
    ...
    module;: {
        [
            ...
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
```

### Create SCSS Files & Directories

```shell script
$ mkdir src/assets/ && mkdir src/assets/scss
```

##### ~/src/assets/scss/app.scss
```scss
body {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: sans-serif;
}

body * {
  box-sizing: border-box;
}

h1 {
  text-align: center;
}
```

## Step 5: Add Local Image Support

### Install Dependencies
```shell script
$ npm install -D file-loader
```

### Create Image Directory
```shell script
$ mkdir src/assets/img
```

### Add Webpack File Loader

##### ~/webpack.config.js.backup
```javascript
module.exports = {
    ...
    module;: {
        [
            ...
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash].[ext]'
                    }
                }
            }
        ]
    }
}
```

### Add Placeholder image
Download an example image into this directory, you can use the following link:

https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png

### Display image in React

##### ~/src/react/components/app.tsx
```typescript jsx
import logo from '../../assets/img/react.png';

const App = () => {
    return (
        <div className="app_container">
            <div className="app_inner">
                <h1>Welcome to React-Typescript!</h1>
                <img src={logo} alt="react_logo"/>
            </div>
        </div>
    )
};
```

## Step 6: Environmental Variables

### Install Dependencies
```shell script
$ npm install -D dotenv @types/dotenv
```

### Create Files and Directories
```shell script
$ mkdir src/util
```

### Create Secrets File
##### ~/src/util/secrets.ts
```typescript
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync(__dirname + '/.env')) {
    dotenv.config({path: __dirname + '/.env'});
} else if (fs.existsSync(__dirname +'/.env.example')) {
    console.warn('Using .example.env file to supply environmental variables.');
    dotenv.config({path: __dirname + '/.env.example'});
} else {
    console.error('No .env file. Create a .env file in the same directory as this file.');
    process.exit(1);
}

export const ENVIRONMENT = process.env.NODE_ENV;
const production = ENVIRONMENT === 'production';

export const PORT = process.env['PORT'];
if (!PORT) {
    console.error('Environmental Variable: PORT not found, please check .env files.');
    process.exit(1);
}
```

### Create .env file
##### ~/src/util/.env
```dotenv
PORT=3000
```

### Update package.json launch scripts
##### ~/package.json
```json
{
  "scripts": {
    "dev": "NODE_ENV=development nodemon ./src/server/index.ts",
    "prod": "NODE_ENV=production nodemon ./src/server/index.ts"
  }
}
```

### Import Environmental Variables
##### ~/src/server/index.ts
```typescript
import {ENVIRONMENT, PORT} from '../util/secrets';

app.listen(PORT, () => {
    console.log(`Express started on http://localhost:${PORT}/ in ${ENVIRONMENT} mode.`);
});
```

## Step 7: Configure Jest
### Install dependencies
```shell script
npm install -D jest @types/jest ts-jest supertest @types/supertest
```

### Create React Jest configuration file
##### ~/src/react/jest.config.js
```javascript
module.exports = {
    'name': 'react',
    'roots': [
        '<rootDir>'
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    'transform': {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    'moduleNameMapper': {
        '\\.(css|jpg|png|scss)$': '<rootDir>/../util/_empty.js'
    }
};
```

### Create empty javascript file
##### ~/src/util/_empty.js
```javascript
// keep this file empty
```

### Add test for app.tsx
##### ~/src/react/components/app.spec.tsx
```typescript jsx
import React from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from 'react-dom/test-utils';

import App from './app';

let container: HTMLDivElement | null = null;
beforeEach(() => {
    // setup DOM element as render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders with an h1 with some text', () => {
    act(() => {
        render(<App/>, container);
    });
    const h1 = container.children[0].children[0].children[0];
    expect(h1.tagName).toBe("H1");
    expect(h1.textContent).toBe("Welcome to React-Typescript!");
});

it('renders an image with some alt text', () => {
    act(() => {
        render(<App/>, container);
    });
    const img = container.children[0].children[0].children[1];
    expect(img.tagName).toBe("IMG");
    expect(img.attributes.getNamedItem("alt").value).toBe("react_logo");
});
```

### Create Express Jest configuration file
##### ~/src/server/jest.config.js
```javascript
module.exports = {
    'name': 'server',
    'roots': [
        '<rootDir>'
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    'transform': {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    'testEnvironment': 'node'
};
```

### Add test for home.ts
##### ~/src/server/controllers/home.spec.ts
```typescript
import app from '../index';
import supertest, {Response} from 'supertest';

const request = supertest(app);

it('Gets the home endpoint', async done => {
    // Sends GET Request to /api/ endpoint
    const response: Response = await request.get('/api/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Express-Typescript!');
    done();
});
```

### Add test command to package.json
##### ~/package.json
```json
{
  ...
  "scripts": {
    ...
    "test": "jest --projects src/react src/server"
  }
}
```