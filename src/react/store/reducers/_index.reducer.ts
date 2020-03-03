import {combineReducers} from 'redux';
import sidebar from './sidebar.reducer';
import auth from "./auth.reducer";

const app = combineReducers({
    auth,
    sidebar
});

export default app;