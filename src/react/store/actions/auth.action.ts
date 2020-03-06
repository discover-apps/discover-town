export const setAccessToken = (token: string) => ({
    type: 'LOGIN',
    accessToken: token
});

export const deleteAccessToken = () => ({
    type: 'LOGOUT'
});