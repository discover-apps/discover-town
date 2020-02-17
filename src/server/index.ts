import express, {Request, Response} from 'express';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {ENVIRONMENT, PORT} from '../util/secrets';
// Import API Routes
import * as home from './controllers/home';

// Create express server
const app = express();

// Add middleware
app.use(helmet());
app.use(morgan('combined'));

// Configure environment settings
if (ENVIRONMENT === 'development') {
    // Configure Webpack Dev Server (with React Hot-Reload)
    const webpackConfig = require('../../webpack.dev.js');
    const compiler = webpack(webpackConfig);

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: "errors-warnings"
        })
    );
    app.use(webpackHotMiddleware(compiler));
} else {
    // Configure Static Files (Production)
    app.use(express.static("./"));

    // Serve React Static Files (Production)
    app.get('/', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "/index.html"))
    });
}

// Define API routes
app.get('/api/', home.get);

// Start server
app.listen(PORT, () => {
    console.log(`Express started on http://localhost:${PORT}/ in ${ENVIRONMENT} mode.`);
});

export default app;
module.exports = app;