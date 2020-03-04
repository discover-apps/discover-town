export const setJwt = (jwt: string) => ({
    type: 'LOGIN',
    jwt: jwt
});

export const deleteJwt = () => ({
    type: 'LOGOUT'
});