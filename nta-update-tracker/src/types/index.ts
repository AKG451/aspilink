export interface Update {
    id: string;
    title: string;
    content: string;
    date: Date;
}

export interface Subscription {
    email: string;
    subscribedAt: Date;
}