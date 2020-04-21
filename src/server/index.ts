import express, {Request, Response} from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import {ENVIRONMENT, PORT} from "../util/secrets";
// Import API Routes
import * as authController from "./controllers/auth/auth.controller";
import {authenticateSession} from "./controllers/auth/auth.controller";
import * as userController from "./controllers/user/user.controller";
import * as eventController from "./controllers/event/event.controller";
import * as placesController from "./controllers/places/places.controller";

// Create express server
const app = express();

// Add middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

/**
 * API Routes
 */

// Auth Routes
app.get("/api/user", authenticateSession, userController.readCurrentUser);
app.get("/api/auth/logout", authenticateSession, authController.logout);
app.post("/api/auth/login", authController.login);
app.post("/api/auth/register", authController.register);
// User Routes
app.post("/api/user/edit", authenticateSession, userController.editUserProfile);
app.post("/api/user/follow", authenticateSession, userController.followUser);
app.post("/api/user/follows", authenticateSession, userController.followsUser);
app.post("/api/user/unfollow", authenticateSession, userController.unfollowUser);
app.post("/api/user/followercount", userController.getFollowerCount);
app.post("/api/user/followers", userController.getFollowers);
app.post("/api/user/following", userController.getFollowing);
app.post("/api/user/readByEvent", userController.readByEvent);
app.post("/api/user/readByUsername", userController.readByUsername);
// Event Routes
app.post("/api/event/places", eventController.searchPlaces);
app.post("/api/event/create", authenticateSession, eventController.create);
app.post("/api/event/update", authenticateSession, eventController.update);
app.post("/api/event/delete", authenticateSession, eventController.remove);
app.post("/api/event/readById", eventController.readById);
app.post("/api/event/readByUser", eventController.readByUser);
app.post("/api/event/readAttendees", eventController.readAttendees);
app.post("/api/event/readAttending", eventController.readAttending);
app.post("/api/event/readByFollowers", authenticateSession, eventController.readByFollowers);
app.post("/api/event/createAttendee", authenticateSession, eventController.createAttendee);
app.post("/api/event/deleteAttendee", authenticateSession, eventController.deleteAttendee);
app.post("/api/event/attendingEvent", authenticateSession, eventController.attendingEvent);
// Places Routes
app.post("/api/places/readPlacesByCategory", placesController.readPlacesByCategory);
app.post("/api/places/readPlaceDetails", placesController.readPlaceDetails);

app.get("/api/*", (req: Request, res: Response) => {
    res.status(404).send("Route not found");
});

// Configure environment settings
if (ENVIRONMENT === "development") {
    // Configure Webpack Dev Server (with React Hot-Reload)
    const webpackConfig = require("../../webpack.dev.js");
    const compiler = webpack(webpackConfig);
    const history = require("connect-history-api-fallback");
    app.use(history());
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: "/",
            stats: "errors-warnings"
        })
    );
    app.use(webpackHotMiddleware(compiler));
} else {
    // Configure Static Files (Production)
    app.use(express.static(__dirname));

    // Serve React Static Files (Production)
    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "/index.html"));
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Express started on http://localhost:${PORT}/ in ${ENVIRONMENT} mode.`);
});

export default app;
module.exports = app;