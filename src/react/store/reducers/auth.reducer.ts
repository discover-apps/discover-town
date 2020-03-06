interface State {
    accessToken: string;
}

const initialState: State = {
    accessToken: undefined
};

const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, accessToken: action.accessToken};
        case 'LOGOUT':
            return {...state, accessToken: undefined};
        default:
            return state;
    }
};

export default auth;