import {Request} from 'express';

declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.jpg" {
    const value: any;
    export default value;
}

declare module "*.svg" {
    const value: any;
    export default value;
}

declare module "express" {
    export interface Request {
        email?: string;
    }
}