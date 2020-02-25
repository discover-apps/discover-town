const initialState = {
    open: false
};

const sidebar = (state = initialState, action: any) => {
    switch (action.type) {
        case 'OPEN':
            return {open: true};
        case 'CLOSE':
            return {open: false};
        default:
            return state;
    }
};

export default sidebar;