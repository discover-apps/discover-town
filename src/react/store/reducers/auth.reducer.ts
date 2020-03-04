interface State {
    jwt: string;
}

const initialState: State = {
    jwt: undefined
};

const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("jwt", action.jwt);
            return {...state, jwt: action.jwt};
        case 'LOGOUT':
            localStorage.removeItem("jwt");
            return {...state, jwt: undefined};
        default:
            return state;
    }
};

export default auth;