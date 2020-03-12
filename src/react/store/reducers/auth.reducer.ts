import {User} from "../../models/user.model";

interface State {
    accessToken: string;
    currentUser: User;
}

const initialState: State = {
    accessToken: undefined,
    currentUser: undefined
};

const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {...state, accessToken: action.accessToken};
        case 'DELETE_TOKEN':
            return {...state, accessToken: undefined};
        case 'SET_USER':
            return {...state, currentUser: action.currentUser};
        case 'DELETE_USER':
            return {...state, currentUser: undefined};
        default:
            return state;
    }
};

export default auth;