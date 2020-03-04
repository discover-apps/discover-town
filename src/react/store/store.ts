import {createStore} from "redux";
import reducer from "./reducers/_index.reducer";

const store = createStore(reducer);

export default store;