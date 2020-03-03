interface State {
    jwt: string;
}

const initialState: State = {
    jwt: undefined
};

const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            // save jwt to localstorage
            // TODO: Create api for all localstorage actions
            localStorage.setItem("jwt", action.jwt);
            return {...state, jwt: action.jwt};
        case 'LOGOUT':
            return {...state, jwt: undefined};
        default:
            return state;
    }
};

export default auth;