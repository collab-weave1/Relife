declare module '@botpress/webchat';

declare module '*.png' {
    const value: string;
    export default value;
}

const user:
| {
    name?: string
    pictureUrl?: string
    data?: {
    [k: string]: any
    }
    id: string
    createdAt: string
    updatedAt: string
}
| undefined