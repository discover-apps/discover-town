export default interface Session {
    id?: number;
    userId?: number;
    accessToken: string;
    refreshToken: string;
    ip: string;
    agent: string;
}