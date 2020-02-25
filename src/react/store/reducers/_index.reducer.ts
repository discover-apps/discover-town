import {combineReducers} from 'redux';
import sidebar from './sidebar.reducer';

const app = combineReducers({
    sidebar
});

export default app;