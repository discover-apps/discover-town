export const setJwt = (jwt: string) => ({
    type: 'LOGIN',
    jwt: jwt
});